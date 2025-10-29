const express = require('express');
const router = express.Router();
const { getContent } = require('../controllers/contentController');

// @route   GET api/v1/content
// @desc    Get all site content
// @access  Public
router.get('/', getContent);

module.exports = router;
