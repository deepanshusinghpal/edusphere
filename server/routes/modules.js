const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { isInstructor } = require('../middleware/roleCheck');
const { createModule } = require('../controllers/moduleController');
const { check } = require('express-validator');

// @route   POST api/v1/modules
// @desc    Create a new module
// @access  Private (Instructor)
router.post('/', [auth, isInstructor, [
    check('title', 'Title is required').not().isEmpty(),
    check('courseId', 'Course ID is required').isUUID(),
]], createModule);

module.exports = router;
