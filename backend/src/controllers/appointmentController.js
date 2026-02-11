class AppointmentController {
  static async getAllAppointments(req, res) {
    const mockAppointments = [
      { id: "1", patientId: "1", practitionerId: "p1", dateTime: "2026-02-12T10:00:00", status: "scheduled", duration: 30 },
      { id: "2", patientId: "2", practitionerId: "p1", dateTime: "2026-02-12T10:30:00", status: "scheduled", duration: 30 },
      { id: "3", patientId: "3", practitionerId: "p2", dateTime: "2026-02-12T14:00:00", status: "completed", duration: 45 }
    ];
    res.json({ success: true, data: mockAppointments });
  }

  static async createAppointment(req, res) {
    const { patientId, practitionerId, dateTime } = req.body;
    if (!patientId || !practitionerId || !dateTime) {
      return res.status(400).json({ success: false, error: 'Missing fields' });
    }
    res.status(201).json({ success: true, message: 'Appointment created' });
  }

  static async getAppointmentById(req, res) {
    res.json({ success: true, data: {} });
  }

  static async updateAppointment(req, res) {
    res.json({ success: true, message: 'Updated' });
  }

  static async cancelAppointment(req, res) {
    res.json({ success: true, message: 'Cancelled' });
  }

  static async getAvailableSlots(req, res) {
    res.json({ success: true, data: { slots: ['9:00', '9:30', '10:00', '10:30', '11:00'] } });
  }

  static async bookAppointmentOnline(req, res) {
    res.status(201).json({ success: true, message: 'Booked' });
  }

  static async getStatistics(req, res) {
    res.json({ success: true, data: { total: 0, scheduled: 0, completed: 0 } });
  }
}

module.exports = AppointmentController;
