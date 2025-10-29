const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Create a new lesson for a module
// @route   POST /api/v1/lessons
// @access  Private (Instructor)
const createLesson = async (req, res) => {
  const { title, moduleId, contentType, videoUrl, content } = req.body;

  try {
    // A more robust check would verify the module belongs to the instructor's course
    const newLesson = await prisma.lesson.create({
      data: {
        title,
        moduleId,
        contentType,
        videoUrl,
        content,
        order: 1, // Placeholder order
      },
    });
    res.status(201).json(newLesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createLesson };
