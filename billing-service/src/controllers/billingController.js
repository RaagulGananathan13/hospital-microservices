const billModel = require('../models/billModel');
const pool = require('../config/db');

// GET ALL
const getAllBills = async (req, res) => {
  try {
    const bills = await billModel.getAll();
    res.status(200).json({ success: true, data: bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getBillById = async (req, res) => {
  try {
    const bill = await billModel.getById(req.params.id);
    if (!bill) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }
    res.status(200).json({ success: true, data: bill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE (with validation)
const createBill = async (req, res) => {
  try {
    const { patient_id, appointment_id, amount, payment_status, billing_date } = req.body;

    if (!patient_id || !appointment_id || !amount || !payment_status || !billing_date) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check patient exists
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

    // Check appointment exists and belongs to the given patient
    const [appointmentRows] = await pool.query(
      'SELECT id FROM appointments WHERE id = ? AND patient_id = ?',
      [appointment_id, patient_id]
    );

    if (appointmentRows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid appointment_id. Appointment does not exist for the given patient.'
      });
    }

    const [result] = await pool.query(
      `INSERT INTO bills (patient_id, appointment_id, amount, payment_status, billing_date)
       VALUES (?, ?, ?, ?, ?)`,
      [patient_id, appointment_id, amount, payment_status, billing_date]
    );

    res.status(201).json({
      success: true,
      message: 'Bill created successfully',
      data: {
        id: result.insertId,
        patient_id,
        appointment_id,
        amount,
        payment_status,
        billing_date
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating bill',
      error: error.message
    });
  }
};

// UPDATE
const updateBill = async (req, res) => {
  try {
    const updated = await billModel.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }
    res.status(200).json({ success: true, message: 'Bill updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteBill = async (req, res) => {
  try {
    const deleted = await billModel.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }
    res.status(200).json({ success: true, message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill
};