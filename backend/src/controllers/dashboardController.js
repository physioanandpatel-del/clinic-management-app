class DashboardController {
  static async getKPIs(req, res) {
    try {
      const kpis = {
        totalPatients: 127,
        activePatients: 98,
        totalAppointments: 456,
        completedAppointments: 412,
        noShowRate: '5.7%',
        avgRevenuePerPatient: 245.50,
        totalRevenue: 31157.50,
        pendingPayments: 2450.00
      };
      res.json({ success: true, data: kpis });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getHealthScore(req, res) {
    try {
      const healthScore = {
        overallScore: 87,
        patientSatisfaction: 92,
        operationalEfficiency: 85,
        financialHealth: 81,
        appointmentAdherence: 94,
        status: 'Excellent',
        recommendations: [
          'Increase patient retention programs',
          'Optimize scheduling efficiency',
          'Focus on follow-up care'
        ]
      };
      res.json({ success: true, data: healthScore });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getInsights(req, res) {
    try {
      const insights = {
        aiInsights: [
          'Peak appointment times: Tuesday-Thursday 10AM-2PM',
          'Top service: Physical Therapy (34% of revenue)',
          'Patient lifetime value increasing by 12% YoY',
          'Referral rate up 18% from last quarter'
        ],
        trends: {
          appointmentGrowth: '+15% this month',
          revenueGrowth: '+22% this quarter',
          patientRetention: '89%'
        },
        opportunities: [
          'Expand evening hours to capture demand',
          'Develop corporate wellness packages',
          'Implement telehealth for follow-ups'
        ]
      };
      res.json({ success: true, data: insights });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getRevenueReport(req, res) {
    try {
      const report = {
        period: 'Last 30 days',
        totalRevenue: 31157.50,
        byService: {
          'Physical Therapy': 10600,
          'Massage Therapy': 7850,
          'Chiropractic': 6200,
          'Counseling': 4500,
          'Other': 2007.50
        },
        byPaymentMethod: {
          'Insurance': 18694.50,
          'Cash': 8450,
          'Credit Card': 4013
        },
        paymentStatus: {
          'Paid': 28707.50,
          'Pending': 2450
        }
      };
      res.json({ success: true, data: report });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getAppointmentMetrics(req, res) {
    try {
      const metrics = {
        thisMonth: 156,
        lastMonth: 144,
        growth: '+8.3%',
        avgDuration: '45 minutes',
        byStatus: {
          'Completed': 145,
          'Scheduled': 11,
          'Cancelled': 4,
          'No-show': 8
        },
        peakDays: ['Tuesday', 'Wednesday', 'Thursday']
      };
      res.json({ success: true, data: metrics });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getGrowthMetrics(req, res) {
    try {
      const growth = {
        newPatientThisMonth: 12,
        newPatientLastMonth: 9,
        growthRate: '+33%',
        retentionRate: '89%',
        churnRate: '11%',
        avgPatientLifetime: '18 months',
        projectedYearlyRevenue: 378900
      };
      res.json({ success: true, data: growth });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = DashboardController;