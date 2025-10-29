const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all course categories
// @route   GET /api/v1/categories
// @access  Public
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllCategories,
};
