const Claim = {
  id: 'uuid',
  invoiceId: 'uuid',
  insuranceId: 'uuid',
  claimNumber: '',
  status: 'draft',
  submittedAt: null,
  approvedAmount: 0.00,
  createdAt: new Date(),
  updatedAt: new Date()
};

module.exports = Claim;