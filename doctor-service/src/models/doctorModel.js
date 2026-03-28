
const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM doctors ORDER BY id DESC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM doctors WHERE id = ?', [id]);
  return rows[0];
};

const create = async ({ full_name, specialization, email, phone, room_no }) => {
  const [result] = await pool.query(
    'INSERT INTO doctors (full_name, specialization, email, phone, room_no) VALUES (?, ?, ?, ?, ?)',
    [full_name, specialization, email || null, phone || null, room_no || null]
  );
  return { id: result.insertId, full_name, specialization, email, phone, room_no };
};

const update = async (id, { full_name, specialization, email, phone, room_no }) => {
  const [result] = await pool.query(
    'UPDATE doctors SET full_name = ?, specialization = ?, email = ?, phone = ?, room_no = ? WHERE id = ?',
    [full_name, specialization, email || null, phone || null, room_no || null, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM doctors WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };
