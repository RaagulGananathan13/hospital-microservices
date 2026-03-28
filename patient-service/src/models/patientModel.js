
const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM patients ORDER BY id DESC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [id]);
  return rows[0];
};

const create = async ({ full_name, age, gender, phone, address }) => {
  const [result] = await pool.query(
    'INSERT INTO patients (full_name, age, gender, phone, address) VALUES (?, ?, ?, ?, ?)',
    [full_name, age, gender, phone || null, address || null]
  );
  return { id: result.insertId, full_name, age, gender, phone, address };
};

const update = async (id, { full_name, age, gender, phone, address }) => {
  const [result] = await pool.query(
    'UPDATE patients SET full_name = ?, age = ?, gender = ?, phone = ?, address = ? WHERE id = ?',
    [full_name, age, gender, phone || null, address || null, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM patients WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };
