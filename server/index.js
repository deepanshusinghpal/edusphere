require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');
const chatbotRoutes = require('./routes/chatbot');
const contentRoutes = require('./routes/content');
const moduleRoutes = require('./routes/modules');
const lessonRoutes = require('./routes/lessons');

// Initialize Express app
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/chatbot', chatbotRoutes);
app.use('/api/v1/content', contentRoutes); 
app.use('/api/v1/modules', moduleRoutes);
app.use('/api/v1/lessons', lessonRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EduSphere API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// --- VERCEL/LOCAL FIX ---
// This will start the server locally, but Vercel will ignore it.
// We check if the VERCEL environment variable exists. If it does NOT, we start the server.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// --- VERCEL CHANGE ---
// Export the app for Vercel to use as a serverless function
module.exports = app;

