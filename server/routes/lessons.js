const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { isInstructor } = require('../middleware/roleCheck');
const { createLesson } = require('../controllers/lessonController');
const { check } = require('express-validator');

// @route   POST api/v1/lessons
// @desc    Create a new lesson
// @access  Private (Instructor)
router.post('/', [auth, isInstructor, [
    check('title', 'Title is required').not().isEmpty(),
    check('moduleId', 'Module ID is required').isUUID(),
    check('contentType', 'Content type is required').isIn(['VIDEO', 'TEXT', 'PDF']),
]], createLesson);

module.exports = router;
