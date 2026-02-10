const express = require('express');
const InvoiceController = require('../controllers/invoiceController');

const router = express.Router();

router.get('/', InvoiceController.getAllInvoices);
router.post('/', InvoiceController.createInvoice);
router.get('/stats/summary', InvoiceController.getBillingStatistics);
router.get('/:id', InvoiceController.getInvoiceById);
router.put('/:id', InvoiceController.updateInvoice);
router.delete('/:id', InvoiceController.deleteInvoice);
router.post('/:id/payment', InvoiceController.recordPayment);
router.get('/:id/payments', InvoiceController.getPaymentHistory);
router.post('/:id/claim', InvoiceController.submitInsuranceClaim);

module.exports = router;