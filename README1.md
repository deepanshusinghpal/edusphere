EduSphere - E-Learning PlatformEduSphere is a comprehensive e-learning platform built with the PERN stack (PostgreSQL, Express.js, React, Node.js). It provides a robust system for course creation, management, and consumption with features like user authentication, course enrollment, payment processing, and an AI-powered chatbot.FeaturesCore Features (MVP)User Authentication & RolesSecure registration/login with JWT and bcrypt.Role-based access for Students and Instructors.Course Management (Instructor Dashboard)A dedicated dashboard for instructors to create and manage their courses.A full curriculum builder to add and organize Modules and Lessons.Support for different lesson types, including text content and embedded YouTube videos.Course Discovery & EnrollmentA high-fidelity, professional course catalog and detail pages.A complete enrollment system supporting both paid courses (via Razorpay) and instant free enrollment.A personal "My Learning" dashboard for students to access their enrolled courses.Learning InterfaceA clean, modern interface for students to consume course content after enrollment.Payment Gateway IntegrationFull integration with the Razorpay API for secure payment processing.Secure payment verification and automatic course enrollment upon successful payment.AI-Powered Chatbot ("EduBot")A full-stack chatbot feature with a floating UI, connected to a backend that is ready for OpenAI API integration.Advanced FeaturesStudent Progress Tracking (Foundation in place)Quizzes and Assessments (Database schema ready)Course Ratings and Reviews (Database schema ready)Tech StackBackendNode.js & Express.jsPrisma ORMPostgreSQLJWT AuthenticationOpenAI API (ready)Razorpay APICloudinary for file storage (planned)FrontendReact with ViteReact RouterRedux ToolkitTailwind CSS (with a custom edX-based design system)AxiosProject Structureedusphere-project/
├── client/                  # Frontend React application
│   └── src/
│       ├── components/
│       │   ├── common/      # Global reusable components (CourseCard, ProtectedRoute)
│       │   ├── courses/     # Components for course pages (FilterSidebar, ModuleAccordion)
│       │   ├── dashboard/   # Components for dashboards (CourseManager, CreateCourseModal)
│       │   ├── home/        # Components for the homepage (CategoryCard, ValuePropCard)
│       │   └── layout/      # Main layout (Navbar, Footer)
│       ├── pages/           # Page-level components (HomePage, EditCoursePage, etc.)
│       └── store/
│           └── slices/      # Redux state slices (authSlice, courseSlice, etc.)
│
└── server/                  # Backend Express application
    ├── controllers/         # Contains all business logic (authController.js, courseController.js)
    ├── middleware/          # Custom middleware (auth.js, roleCheck.js)
    ├── prisma/
    │   ├── migrations/
    │   └── schema.prisma    # The database blueprint
    └── routes/              # Defines all API endpoints (auth.js, courses.js, etc.)
Setup InstructionsPrerequisitesNode.js (v16 or higher)PostgreSQL (v12 or higher)npm or yarnEnvironment VariablesBackend (server/.env)# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/edusphere"

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# APIs (Optional for full feature set)
OPENAI_API_KEY=your_openai_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
Frontend (client/.env)VITE_API_URL=http://localhost:5000/api/v1
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
InstallationClone the repository and navigate into the project directory.Create your database in PostgreSQL with the name edusphere.Set up the Backend:cd server
# Create the .env file and add your variables
npm install
npx prisma migrate dev --name init
npm run prisma:seed  # <-- CRUCIAL: Populates the database with sample data
npm run dev
Set up the Frontend (in a new terminal):cd client
# Create the .env file and add your variables
npm install --legacy-peer-deps # Use flag to avoid dependency conflicts
npm run dev
Access the application at http://localhost:5173.API EndpointsAuthentication (/api/v1/auth)POST /register: Register a new userPOST /login: Login a userGET /me: Get current userCourses (/api/v1/courses)GET /: Get all coursesGET /:id: Get a course by IDPOST /: Create a new course (Instructor only)GET /my-courses: Get courses for the logged-in instructorGET /my-enrollments: Get courses for the logged-in studentPOST /:id/enroll-free: Enroll in a free course (Student only)Curriculum (/api/v1/)POST /modules: Create a new module (Instructor only)POST /lessons: Create a new lesson (Instructor only)Payments (/api/v1/payments)POST /create-order: Create a payment orderPOST /verify: Verify a paymentChatbot (/api/v1/chatbot)POST /ask: Ask a question to the AI chatbotGET /history: Get chat historyUser Roles and PermissionsStudentBrowse and search coursesEnroll in courses (both free and paid)Access their personal "My Learning" dashboard to see enrolled coursesView course content on the learning pageUse the AI chatbot for assistanceInstructorAll Student permissionsCreate new courses via the Instructor DashboardManage their own coursesBuild a full course curriculum with modules and lessonsAdmin(This role is defined in the database and can be used to build a future admin panel for full platform management).DeploymentBackend DeploymentSet up a production PostgreSQL database.Configure environment variables for production.Start the server: npm start.Frontend DeploymentConfigure environment variables for production.Build the application: npm run build.Deploy the dist folder to a static hosting service.LicenseMIT