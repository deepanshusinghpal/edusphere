# EduSphere - E-Learning Platform

EduSphere is a comprehensive e-learning platform built with the PERN stack (PostgreSQL, Express.js, React, Node.js). It provides a robust system for course creation, management, and consumption with features like user authentication, course enrollment, payment processing, and an AI-powered chatbot.

## Features

### Core Features (MVP)
- **User Authentication & Roles**
  - Secure registration/login with JWT and bcrypt
  - Role-based access: Student, Instructor, Admin

- **Course Management (Instructor Dashboard)**
  - Full CRUD operations for courses
  - Structured course content with modules and lessons
  - Support for text, video, and PDF content

- **Course Discovery & Enrollment**
  - Public course catalog with search and filtering
  - Detailed course pages
  - Student enrollment system
  - Personal dashboard for enrolled courses

- **Learning Interface**
  - Clean content viewing interface
  - Navigation between lessons and modules

- **Payment Gateway Integration**
  - Razorpay integration for secure payments
  - Automatic enrollment after successful payment
  - Payment history tracking

- **AI-Powered Chatbot ("EduBot")**
  - General platform assistance
  - Personalized course recommendations
  - Context-aware learning support
  - Chat history for reference

### Advanced Features
- **Student Progress Tracking**
  - Lesson completion marking
  - Course progress percentage

- **Quizzes and Assessments**
  - Multiple-choice quizzes
  - Score tracking and performance analytics

- **Course Ratings and Reviews**
  - Star ratings and written reviews
  - Average rating display

## Tech Stack

### Backend
- Node.js & Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- OpenAI API
- Razorpay API
- Cloudinary for file storage

### Frontend
- React with Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios

## Project Structure
```
edusphere-project/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   ├── src/                # Source files
│   │   ├── components/     # Reusable components
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── chatbot/    # AI chatbot components
│   │   │   ├── course/     # Course-related components
│   │   │   ├── dashboard/  # Dashboard components
│   │   │   ├── layout/     # Layout components
│   │   │   └── payment/    # Payment components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   │   ├── slices/     # Redux slices
│   │   │   └── index.js    # Store configuration
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main App component
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # Entry point
│   ├── .env                # Environment variables
│   └── package.json        # Dependencies
│
├── server/                 # Backend Express application
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js         # Authentication middleware
│   │   └── roleCheck.js    # Role-based access control
│   ├── prisma/             # Prisma schema and migrations
│   │   └── schema.prisma   # Database schema
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── chatbot.js      # AI chatbot routes
│   │   ├── courses.js      # Course management routes
│   │   └── payments.js     # Payment processing routes
│   ├── index.js            # Entry point
│   ├── .env                # Environment variables
│   └── package.json        # Dependencies
│
└── README.md               # Project documentation
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Razorpay account for payment processing
- OpenAI API key for AI chatbot
- Cloudinary account for file storage

### Environment Variables

#### Backend (.env)
```
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/edusphere"

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api/v1
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/edusphere-project.git
cd edusphere-project
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Set up the database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start the backend server
```bash
npm run dev
```

5. Install frontend dependencies
```bash
cd ../client
npm install
```

6. Start the frontend development server
```bash
npm run dev
```

7. Access the application at `http://localhost:5173`

### API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login a user
- `GET /api/v1/auth/me` - Get current user

#### Courses
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:id` - Get a course by ID
- `POST /api/v1/courses` - Create a new course (Instructor only)
- `PUT /api/v1/courses/:id` - Update a course (Instructor only)
- `DELETE /api/v1/courses/:id` - Delete a course (Instructor only)
- `POST /api/v1/courses/:id/enroll` - Enroll in a course (Student only)

#### Payments
- `POST /api/v1/payments/create-order` - Create a payment order
- `POST /api/v1/payments/verify` - Verify a payment
- `GET /api/v1/payments/history` - Get payment history

#### Chatbot
- `POST /api/v1/chatbot/ask` - Ask a question to the AI chatbot
- `GET /api/v1/chatbot/history` - Get chat history

### User Roles and Permissions

#### Student
- Browse and search courses
- Enroll in courses
- Track progress and complete lessons
- Take quizzes and assessments
- Leave reviews and ratings
- Use AI chatbot for learning assistance

#### Instructor
- Create and manage courses
- Add and update course content
- View student enrollments and progress
- Respond to student reviews
- Access analytics for their courses

#### Admin
- Manage all users, courses, and content
- Approve or reject course submissions
- Monitor platform activity and analytics
- Configure system settings

## Deployment

### Backend Deployment
1. Set up a PostgreSQL database
2. Configure environment variables for production
3. Build the application: `npm run build`
4. Start the server: `npm start`

### Frontend Deployment
1. Configure environment variables for production
2. Build the application: `npm run build`
3. Deploy the `dist` folder to a static hosting service

## License
MIT