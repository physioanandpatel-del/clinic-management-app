const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes');
const chartRoutes = require('./routes/chartRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000', 'http://127.0.0.1:3001'],
  credentials: true
}));

app.use(morgan('combined'));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', module: 'Patient Management ✅' });
});

app.get('/', (req, res) => {
  res.redirect('/api/health');
});

app.use('/api/patients', patientRoutes);

app.use('/api/appointments', appointmentRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
