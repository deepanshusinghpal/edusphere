const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../controllers/categoryController');

// @route   GET api/v1/categories
// @desc    Get all course categories
// @access  Public
router.get('/', getAllCategories);

module.exports = router;
