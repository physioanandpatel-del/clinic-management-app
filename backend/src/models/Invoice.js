const Invoice = {
  id: 'uuid',
  patientId: 'uuid',
  appointmentId: 'uuid',
  amount: 0.00,
  dueDate: new Date(),
  status: 'draft',
  items: [],
  notes: '',
  createdAt: new Date(),
  updatedAt: new Date()
};

module.exports = Invoice;