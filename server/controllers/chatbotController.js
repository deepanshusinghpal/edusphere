const { PrismaClient } = require('@prisma/client');
const OpenAI = require('openai');

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @desc    Ask a question to the AI chatbot
// @route   POST /api/v1/chatbot/ask
// @access  Private
const askQuestion = async (req, res) => {
  try {
    const { message, context, type } = req.body;
    const userId = req.user.id;

    if (!message) {
      return res.status(400).json({ msg: 'Message is required' });
    }

    // --- For now, to avoid real API costs, we will return a helpful, pre-programmed response. ---
    // --- You can uncomment the OpenAI logic below when you are ready to go live. ---
    
    let botResponse = "Thank you for your question! As a demo, I am programmed to provide this standard response. The full AI integration is ready to be activated.";

    if (type === 'recommendation') {
        botResponse = "Based on your interest, I recommend exploring our 'Web Development with PERN Stack' and 'Data Structures and Algorithms' courses!";
    }

    // Save the conversation to the database
    await prisma.chatMessage.create({
      data: {
        userId,
        message,
        response: botResponse,
        context: context || null
      }
    });
    
    res.json({ response: botResponse });

    /* // --- REAL OPENAI API LOGIC (Commented out for now) ---

    let systemPrompt = 'You are EduBot, a helpful assistant for the EduSphere e-learning platform.';
    let userPrompt = message;
    
    // ... (Your switch case logic for different prompt types)

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 500
    });

    const response = completion.choices[0].message.content;

    await prisma.chatMessage.create({
      data: { userId, message, response, context: context || null }
    });

    res.json({ response });
    */

  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ 
      msg: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};


// @desc    Get chat history for a user
// @route   GET /api/v1/chatbot/history
// @access  Private
const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const chatHistory = await prisma.chatMessage.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' }, // Order by oldest first for conversation flow
            take: 50
        });
        res.json(chatHistory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
  askQuestion,
  getHistory,
};

