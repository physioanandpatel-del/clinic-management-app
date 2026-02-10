const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
app.use(morgan('combined'));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', module: 'Patient Management ✅' });
});

app.get('/api/patients', (req, res) => {
  res.json({ success: true, data: [] });
});

app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
