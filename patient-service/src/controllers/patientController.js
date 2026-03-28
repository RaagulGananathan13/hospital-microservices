
const patientModel = require('../models/patientModel');

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.getAll();
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await patientModel.getById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPatient = async (req, res) => {
  try {
    const { full_name, age, gender, phone, address } = req.body;
    if (!full_name || !age || !gender) {
      return res.status(400).json({ success: false, message: 'full_name, age and gender are required' });
    }
    const result = await patientModel.create({ full_name, age, gender, phone, address });
    res.status(201).json({ success: true, message: 'Patient created successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const updated = await patientModel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Patient not found' });
    res.status(200).json({ success: true, message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const deleted = await patientModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Patient not found' });
    res.status(200).json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient };
