
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');
const setupSwagger = require('./docs/swagger');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, service: 'Appointment Service', message: 'Appointment service is running' });
});

app.use('/appointments', require('./routes/appointmentRoutes'));
setupSwagger(app);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const startServer = async () => {
  try {
    await pool.getConnection();
    console.log('Appointment service connected to MySQL');
    app.listen(PORT, () => console.log(`Appointment service running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

startServer();
