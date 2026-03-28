
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');
const setupSwagger = require('./docs/swagger');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, service: 'Patient Service', message: 'Patient service is running' });
});

app.use('/patients', require('./routes/patientRoutes'));
setupSwagger(app);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const startServer = async () => {
  try {
    await pool.getConnection();
    console.log('Patient service connected to MySQL');
    app.listen(PORT, () => console.log(`Patient service running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

startServer();
