class CampaignController {
  static async getAllCampaigns(req, res) {
    const mockCampaigns = [
      { id: "1", name: "Appointment Reminder", type: "email", status: "sent", recipientCount: 45, completionRate: 78 },
      { id: "2", name: "Re-engagement Campaign", type: "sms", status: "sent", recipientCount: 32, completionRate: 62 },
      { id: "3", name: "NPS Survey", type: "survey", status: "active", recipientCount: 28, completionRate: 45 }
    ];
    res.json({ success: true, data: mockCampaigns });
  }

  static async getCampaignById(req, res) {
    try {
      res.json({ success: true, data: {} });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async createCampaign(req, res) {
    try {
      const { name, type, recipientCount } = req.body;
      if (!name || !type) {
        return res.status(400).json({ success: false, error: 'Missing fields' });
      }
      res.status(201).json({ 
        success: true, 
        message: 'Campaign created',
        data: { id: 'campaign-id', ...req.body, status: 'draft' }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async updateCampaign(req, res) {
    try {
      res.json({ success: true, message: 'Campaign updated', data: {} });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async deleteCampaign(req, res) {
    try {
      res.json({ success: true, message: 'Campaign deleted' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async sendCampaign(req, res) {
    try {
      res.json({ 
        success: true, 
        message: 'Campaign sent',
        data: { status: 'sent', sentAt: new Date() }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getCampaignResults(req, res) {
    try {
      const { campaignId } = req.params;
      res.json({ 
        success: true, 
        data: {
          campaignId,
          sent: 0,
          opened: 0,
          clicked: 0,
          completed: 0,
          completionRate: '0%'
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = CampaignController;