const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all site content
// @route   GET /api/v1/content
// @access  Public
const getContent = async (req, res) => {
  try {
    const contentItems = await prisma.siteContent.findMany();
    // Convert the array of items into a simple key-value object
    const content = contentItems.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getContent,
};
