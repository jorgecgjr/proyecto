const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getDispositivos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dispositivos');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDispositivo = async (req, res) => {
  const { nombre, ubicacion, coordenadas, potencia, voltaje, corriente, caudal, estado } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO dispositivos (nombre, ubicacion, coordenadas, potencia, voltaje, corriente, caudal, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [nombre, ubicacion, coordenadas, potencia, voltaje, corriente, caudal, estado]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDispositivo = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM dispositivos WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { nombre, userName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, username, password) VALUES ($1, $2, $3) RETURNING *',
      [nombre, userName, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [userName]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (await bcrypt.compare(password, user.password)) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDispositivos,
  createDispositivo,
  deleteDispositivo,
  registerUser,
  loginUser,
};