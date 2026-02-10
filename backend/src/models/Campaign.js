const Campaign = {
  id: 'uuid',
  name: '',
  type: 'email',
  status: 'draft',
  recipientCount: 0,
  completionRate: 0,
  sentAt: null,
  templateType: 'reminder',
  createdAt: new Date(),
  updatedAt: new Date()
};

module.exports = Campaign;