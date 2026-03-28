
const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM bills ORDER BY id DESC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM bills WHERE id = ?', [id]);
  return rows[0];
};

const create = async ({ patient_id, appointment_id, amount, payment_status, billing_date }) => {
  const [result] = await pool.query(
    'INSERT INTO bills (patient_id, appointment_id, amount, payment_status, billing_date) VALUES (?, ?, ?, ?, ?)',
    [patient_id, appointment_id || null, amount, payment_status || 'Pending', billing_date]
  );
  return { id: result.insertId, patient_id, appointment_id, amount, payment_status: payment_status || 'Pending', billing_date };
};

const update = async (id, { patient_id, appointment_id, amount, payment_status, billing_date }) => {
  const [result] = await pool.query(
    'UPDATE bills SET patient_id = ?, appointment_id = ?, amount = ?, payment_status = ?, billing_date = ? WHERE id = ?',
    [patient_id, appointment_id || null, amount, payment_status || 'Pending', billing_date, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM bills WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };
