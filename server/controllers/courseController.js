const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

// @route   GET api/v1/courses
// @desc    Get all courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      // --- THIS IS THE CRITICAL FIX ---
      // We switch from 'include' to 'select' to guarantee the 'level' field is fetched.
      select: {
        id: true,
        title: true,
        thumbnail: true,
        link: true,
        price: true,
        level: true, // Now the level data will be included in the response
        category: {
          select: { name: true }
        },
        instructor: {
          select: { name: true }
        },
        reviews: {
          select: { rating: true }
        },
      },
    });

    const coursesWithRating = courses.map(course => {
      const ratings = course.reviews.map(review => review.rating);
      const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
      return { ...course, avgRating, reviewCount: ratings.length };
    });

    res.json(coursesWithRating);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET api/v1/courses/:id
// @desc    Get course by ID
// @access  Public
const getCourseById = async (req, res) => {
    try {
        const course = await prisma.course.findUnique({
          where: { id: req.params.id },
          include: {
            instructor: { select: { id: true, name: true, profilePicture: true, bio: true } },
            category: true,
            modules: { include: { lessons: true, quizzes: true }, orderBy: { order: 'asc' } },
            reviews: { include: { user: { select: { id: true, name: true, profilePicture: true } } } },
          },
        });
    
        if (!course) {
          return res.status(404).json({ msg: 'Course not found' });
        }
    
        const ratings = course.reviews.map(review => review.rating);
        const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
        
        const courseWithRating = { ...course, avgRating, reviewCount: ratings.length };
    
        res.json(courseWithRating);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
};

// @route   POST api/v1/courses
// @desc    Create a course
// @access  Private (Instructor only)
const createCourse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, price, thumbnail, categoryId } = req.body;
    try {
        const course = await prisma.course.create({
        data: {
            title,
            description,
            price: parseFloat(price),
            thumbnail,
            instructorId: req.user.id,
            categoryId,
        },
        });
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get courses for the logged-in instructor
// @route   GET /api/v1/courses/my-courses
// @access  Private (Instructor only)
const getInstructorCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { instructorId: req.user.id },
      include: { enrollments: true },
    });
    const coursesWithStudentCount = courses.map(course => ({
        ...course,
        students: course.enrollments.length,
        status: 'Published' // Placeholder status
    }));
    res.json(coursesWithStudentCount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get courses the logged-in student is enrolled in
// @route   GET /api/v1/courses/my-enrollments
// @access  Private (Student only)
const getEnrolledCourses = async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id },
      include: {
        course: {
          include: {
            instructor: { select: { name: true } },
            reviews: { select: { rating: true } }
          }
        }
      }
    });
    const courses = enrollments.map(enrollment => {
        const course = enrollment.course;
        const ratings = course.reviews.map(r => r.rating);
        const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
        return {
            ...course,
            avgRating,
            reviewCount: ratings.length
        };
    });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Enroll in a free course instantly
// @route   POST /api/v1/courses/:id/enroll-free
// @access  Private (Student only)
const enrollInFreeCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    if (course.price !== 0) {
      return res.status(400).json({ msg: 'This course is not free.' });
    }
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (existingEnrollment) {
      return res.status(400).json({ msg: 'You are already enrolled in this course.' });
    }
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: userId,
        courseId: courseId,
        paymentStatus: 'COMPLETED',
      },
    });
    res.status(201).json({ message: 'Enrollment successful!', enrollment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  getInstructorCourses,
  getEnrolledCourses,
  enrollInFreeCourse,
};

