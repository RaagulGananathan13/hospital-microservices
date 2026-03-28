const appointmentModel = require('../models/appointmentModel');
const pool = require('../config/db');

// GET ALL
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAll();
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentModel.getById(req.params.id);
    if (!appointment)
      return res.status(404).json({ success: false, message: 'Appointment not found' });

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE (with validation 🔥)
const createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date, appointment_time, status } = req.body;

    if (!patient_id || !doctor_id || !appointment_date || !appointment_time || !status) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // check patient
    const [patientRows] = await pool.query(
      'SELECT id FROM patients WHERE id = ?',
      [patient_id]
    );

    if (patientRows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid patient_id. Patient does not exist.'
      });
    }

    // check doctor
    const [doctorRows] = await pool.query(
      'SELECT id FROM doctors WHERE id = ?',
      [doctor_id]
    );

    if (doctorRows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor_id. Doctor does not exist.'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status)
       VALUES (?, ?, ?, ?, ?)`,
      [patient_id, doctor_id, appointment_date, appointment_time, status]
    );

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: {
        id: result.insertId,
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

// UPDATE
const updateAppointment = async (req, res) => {
  try {
    const updated = await appointmentModel.update(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ success: false, message: 'Appointment not found' });

    res.status(200).json({ success: true, message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteAppointment = async (req, res) => {
  try {
    const deleted = await appointmentModel.remove(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: 'Appointment not found' });

    res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};