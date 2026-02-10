const Payment = {
  id: 'uuid',
  invoiceId: 'uuid',
  amount: 0.00,
  paymentMethod: 'credit_card',
  transactionId: '',
  status: 'pending',
  processedAt: null,
  createdAt: new Date()
};

module.exports = Payment;