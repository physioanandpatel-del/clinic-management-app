const express = require('express');
const AppointmentController = require('../controllers/appointmentController');

const router = express.Router();

router.get('/', AppointmentController.getAllAppointments);
router.post('/', AppointmentController.createAppointment);
router.get('/availability', AppointmentController.getAvailableSlots);
router.post('/book', AppointmentController.bookAppointmentOnline);
router.get('/stats/summary', AppointmentController.getStatistics);
router.get('/:id', AppointmentController.getAppointmentById);
router.put('/:id', AppointmentController.updateAppointment);
router.delete('/:id', AppointmentController.cancelAppointment);

module.exports = router;
