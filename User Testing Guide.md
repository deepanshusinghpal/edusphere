EduSphere - Platform Guide & Feature Walkthrough
This document provides a high-level overview of the EduSphere application, explaining its core features and how users interact with the platform.

1. The User Authentication Flow
The foundation of the platform is its secure authentication system, which manages different user roles.

How to Register
A new user can register for an account, which will be created with the STUDENT role by default.

Navigate to the /register page.

Fill in the required fields: Name, Email, and Password.

Upon submission, the frontend makes a POST request to the /api/v1/auth/register endpoint.

The backend securely hashes the password using bcryptjs and saves the new user to the User table in the database.

A JSON Web Token (JWT) is generated, signed, and sent back to the frontend.

The frontend saves this token and the user's information, automatically logging them in and redirecting them to their dashboard.

How to Log In
An existing user can log in to access their account.

Navigate to the /login page.

Enter the correct Email and Password.

Upon submission, the frontend sends the credentials to the /api/v1/auth/login endpoint.

The backend finds the user by their email and uses bcryptjs to securely compare the provided password with the hashed password stored in the database.

If the credentials are valid, a new JWT is generated and sent back to the frontend, establishing a new session.

2. The Student Experience
Once logged in as a STUDENT, the user has access to the core learning features of the platform.

Course Discovery
Homepage: The student can see a list of "Featured Courses" that are fetched dynamically from the backend.

Explore Courses Page (/courses): The student can view a full catalog of all courses available on the platform, complete with a filter sidebar.

Enrollment Process
This is one of the most important features. The application intelligently handles both free and paid courses.

When a student clicks the "Enroll" button on a CourseDetailPage:

If the course price is 0: The frontend makes a direct API call to the /api/v1/courses/:id/enroll-free endpoint. The backend instantly creates an enrollment record in the database, and the student is immediately redirected to the LearningPage.

If the course has a price: The frontend first asks the backend to create a Razorpay order. The Razorpay payment popup opens. Upon a successful payment, the frontend sends the payment details to the /api/v1/payments/verify endpoint. The backend securely verifies the payment signature and then creates the enrollment record.

The Student Dashboard (/dashboard)
This is the student's personal hub, where they can see a grid of all the courses they are currently enrolled in.

The Learning Page (/learn/:courseId)
After enrolling, this is where the student consumes the course content. The page displays the course curriculum (modules and lessons) in a clean, two-column layout.

3. The Instructor Experience
A user with the INSTRUCTOR role has access to powerful content creation tools.

Instructor Dashboard (/instructor/dashboard)
This is the instructor's main control panel. It displays a table of all the courses they have created and provides a button to create new ones.

Course & Curriculum Creation
This is the heart of the platform for content creators.

Create a Course: The instructor can click the "Create New Course" button to open a modal where they can define the high-level details of a new course (title, price, category, etc.).

Edit Course & Add Content: From the dashboard, the instructor can click the "Edit" button for any course. This takes them to the Edit Course Page. Here, they can:

Create new Modules to structure their course.

Create new Lessons within each module. For video lessons, they can simply paste a YouTube URL.

4. How the Dynamic Content Works (Your CMS)
Your brilliant idea to make the homepage content dynamic has been implemented.

The text for all major headings on the homepage is not hardcoded in React.

Instead, it is stored in the SiteContent table in your database.

This content is created and can be easily updated in the server/prisma/seed.js file.

When the HomePage loads, it makes an API call to /api/v1/content to fetch this text, making the site's content fully manageable from the backend.

This guide covers all the major features and user flows of the completed EduSphere application.