const Chart = {
  id: 'uuid',
  appointmentId: 'uuid',
  patientId: 'uuid',
  practitionerId: 'uuid',
  subjective: '',
  objective: '',
  assessment: '',
  plan: '',
  aiSuggestions: {},
  cptCodes: [],
  diagnosis: '',
  medications: [],
  template: 'default',
  isFinalized: false,
  finalizedAt: null,
  voiceNotesUrl: null,
  createdAt: new Date(),
  updatedAt: new Date()
};

module.exports = Chart;