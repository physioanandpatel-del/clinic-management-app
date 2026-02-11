class PatientController {
  static async getAllPatients(req, res) {
    try {
      const mockPatients = [
        {
          id: "1",
          firstName: "John",
          lastName: "Smith",
          email: "john@clinic.com",
          phone: "416-555-0101",
          status: "active"
        },
        {
          id: "2",
          firstName: "Sarah",
          lastName: "Johnson",
          email: "sarah@clinic.com",
          phone: "416-555-0102",
          status: "active"
        },
        {
          id: "3",
          firstName: "Mike",
          lastName: "Davis",
          email: "mike@clinic.com",
          phone: "416-555-0103",
          status: "active"
        }
      ];
      
      res.json({ 
        success: true, 
        data: mockPatients
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = PatientController;
