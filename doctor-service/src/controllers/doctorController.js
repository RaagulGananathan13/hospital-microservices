
const doctorModel = require('../models/doctorModel');
const pool = require('../config/db');

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.getAll();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.getById(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDoctor = async (req, res) => {
  try {
    const { full_name, specialization, email, phone, room_no } = req.body;
    if (!full_name || !specialization) {
      return res.status(400).json({ success: false, message: 'full_name and specialization are required' });
    }
    const result = await doctorModel.create({ full_name, specialization, email, phone, room_no });
    res.status(201).json({ success: true, message: 'Doctor created successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const updated = await doctorModel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Doctor not found' });
    res.status(200).json({ success: true, message: 'Doctor updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  const doctorId = Number(req.params.id);
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Remove bills tied to this doctor's appointments before deleting appointments.
    await connection.query(
      `DELETE b FROM bills b
       INNER JOIN appointments a ON b.appointment_id = a.id
       WHERE a.doctor_id = ?`,
      [doctorId]
    );

    await connection.query('DELETE FROM appointments WHERE doctor_id = ?', [doctorId]);

    const [result] = await connection.query('DELETE FROM doctors WHERE id = ?', [doctorId]);
    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    await connection.commit();
    res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

module.exports = { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor };
