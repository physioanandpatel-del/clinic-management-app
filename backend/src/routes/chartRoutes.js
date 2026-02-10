const express = require('express');
const ChartController = require('../controllers/chartController');

const router = express.Router();

router.get('/', ChartController.getAllCharts);
router.post('/', ChartController.createChart);
router.get('/patient/:patientId', ChartController.getPatientCharts);
router.get('/:id', ChartController.getChartById);
router.put('/:id', ChartController.updateChart);
router.delete('/:id', ChartController.deleteChart);
router.post('/:id/ai-suggestions', ChartController.getAISuggestions);
router.post('/:id/finalize', ChartController.finalizeChart);

module.exports = router;