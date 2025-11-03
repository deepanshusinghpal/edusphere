const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Import middleware
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

// Import controller
const {
  submitContactForm,
  getContactMessages,
} = require('../controllers/contactController');

// @route   POST api/v1/contact
// @desc    Submit a contact form message
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('message', 'Message is required').not().isEmpty(),
  ],
  submitContactForm
);

// @route   GET api/v1/contact/messages
// @desc    Get all contact messages (Admin Only)
// @access  Private (Admin)
router.get('/messages', auth, isAdmin, getContactMessages);

module.exports = router;