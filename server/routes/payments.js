const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { isStudent } = require('../middleware/roleCheck');

// Import the controller functions
const {
  createOrder,
  verifyPayment,
  getPaymentHistory
} = require('../controllers/paymentController');

// @route   POST api/v1/payments/create-order
// @desc    Create a payment order for a course
// @access  Private (Student only)
router.post('/create-order', auth, isStudent, createOrder);

// @route   POST api/v1/payments/verify
// @desc    Verify a payment and create enrollment
// @access  Private (Student only)
router.post('/verify', auth, isStudent, verifyPayment);

// @route   GET api/v1/payments/history
// @desc    Get payment history for a user
// @access  Private
router.get('/history', auth, getPaymentHistory);


module.exports = router;

