const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Create a new module for a course
// @route   POST /api/v1/modules
// @access  Private (Instructor)
const createModule = async (req, res) => {
  const { title, courseId } = req.body;
  
  try {
    // Ensure the user is the instructor of the course
    const course = await prisma.course.findFirst({
      where: { id: courseId, instructorId: req.user.id },
    });
    if (!course) {
      return res.status(401).json({ msg: 'Not authorized to add modules to this course' });
    }
    const newModule = await prisma.module.create({
      data: { title, courseId, order: 1 }, // Placeholder order
    });
    res.status(201).json(newModule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// ... (We will add update and delete functions later)

module.exports = { createModule };
