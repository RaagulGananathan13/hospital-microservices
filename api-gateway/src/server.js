
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const setupGatewayRoutes = require('./routes/gatewayRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    service: 'API Gateway',
    message: 'Hospital Management API Gateway is running',
    routes: {
      patients: '/api/patients',
      doctors: '/api/doctors',
      appointments: '/api/appointments',
      bills: '/api/bills'
    }
  });
});

setupGatewayRoutes(app);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Gateway route not found' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
