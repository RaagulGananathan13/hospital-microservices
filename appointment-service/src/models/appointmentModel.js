
const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM appointments ORDER BY id DESC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM appointments WHERE id = ?', [id]);
  return rows[0];
};

const create = async ({ patient_id, doctor_id, appointment_date, appointment_time, status }) => {
  const [result] = await pool.query(
    'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
    [patient_id, doctor_id, appointment_date, appointment_time, status || 'Scheduled']
  );
  return { id: result.insertId, patient_id, doctor_id, appointment_date, appointment_time, status: status || 'Scheduled' };
};

const update = async (id, { patient_id, doctor_id, appointment_date, appointment_time, status }) => {
  const [result] = await pool.query(
    'UPDATE appointments SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_time = ?, status = ? WHERE id = ?',
    [patient_id, doctor_id, appointment_date, appointment_time, status || 'Scheduled', id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM appointments WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };
