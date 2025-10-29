const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Import middleware
const auth = require('../middleware/auth');
const { isInstructor, isStudent } = require('../middleware/roleCheck');

// Import all controller functions
const {
  getAllCourses,
  getCourseById,
  createCourse,
  getInstructorCourses,
  getEnrolledCourses,
  enrollInFreeCourse,
} = require('../controllers/courseController');

// --- Private Instructor Routes ---
// These are specific, so they come first.
router.get('/my-courses', auth, isInstructor, getInstructorCourses);

// --- Private Student Routes ---
router.get('/my-enrollments', auth, isStudent, getEnrolledCourses);
router.post('/:id/enroll-free', auth, isStudent, enrollInFreeCourse);

// --- Public Routes ---
// The general '/' route comes after specific string routes.
router.get('/', getAllCourses);

// --- The MOST GENERAL route with a parameter comes LAST ---
router.get('/:id', getCourseById);


// --- Private Route for Creating a course ---
router.post(
  '/',
  [
    auth,
    isInstructor,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('price', 'Price is required').isNumeric(),
      check('thumbnail', 'Thumbnail URL is required').not().isEmpty(),
      check('categoryId', 'Category ID is required').not().isEmpty(),
    ],
  ],
  createCourse
);

module.exports = router;

