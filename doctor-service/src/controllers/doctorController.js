
const doctorModel = require('../models/doctorModel');

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
  try {
    const deleted = await doctorModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Doctor not found' });
    res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor };
