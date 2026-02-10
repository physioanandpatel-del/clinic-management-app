const express = require('express');
const DashboardController = require('../controllers/dashboardController');

const router = express.Router();

router.get('/kpis', DashboardController.getKPIs);
router.get('/health-score', DashboardController.getHealthScore);
router.get('/insights', DashboardController.getInsights);
router.get('/revenue', DashboardController.getRevenueReport);
router.get('/appointments', DashboardController.getAppointmentMetrics);
router.get('/growth', DashboardController.getGrowthMetrics);

module.exports = router;