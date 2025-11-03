require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');
const chatbotRoutes = require('./routes/chatbot');
const contentRoutes = require('./routes/content');
const moduleRoutes = require('./routes/modules');
const lessonRoutes = require('./routes/lessons');
const contactRoutes = require('./routes/contact');

const app = express();
const prisma = new PrismaClient();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// ✅ Add this CSP middleware before routes
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:5000;"
  );
  next();
});

// --- API Routes ---
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/chatbot', chatbotRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/modules', moduleRoutes);
app.use('/api/v1/lessons', lessonRoutes);
app.use('/api/v1/contact', contactRoutes);

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

// --- Local vs Vercel ---
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

module.exports = app;
