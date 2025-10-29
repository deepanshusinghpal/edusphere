const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { askQuestion, getHistory } = require('../controllers/chatbotController');

// @route   POST api/v1/chatbot/ask
// @desc    Ask a question to the AI chatbot
// @access  Private
router.post('/ask', auth, askQuestion);

// @route   GET api/v1/chatbot/history
// @desc    Get chat history for a user
// @access  Private
router.get('/history', auth, getHistory);

module.exports = router;


// // #### **Action Required: Install Backend Package**
// // You need to install the openai library. In your **backend terminal**, stop the server (`Ctrl + C`) and run:
// // ```bash
// // npm install openai

// ```