const { PrismaClient, Level } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const courseContentData = require('./course_content.js');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // --- 1. Clear All Existing Data ---
  await prisma.enrollment.deleteMany().catch(e => console.log("Clearing enrollments..."));
  await prisma.review.deleteMany().catch(e => console.log("Clearing reviews..."));
  await prisma.lessonCompletion.deleteMany().catch(e => console.log("Clearing lesson completions..."));
  await prisma.lesson.deleteMany().catch(e => console.log("Clearing lessons..."));
  await prisma.module.deleteMany().catch(e => console.log("Clearing modules..."));
  await prisma.quizAttempt.deleteMany().catch(e => console.log("Clearing quiz attempts..."));
  await prisma.questionOption.deleteMany().catch(e => console.log("Clearing question options..."));
  await prisma.question.deleteMany().catch(e => console.log("Clearing questions..."));
  await prisma.quiz.deleteMany().catch(e => console.log("Clearing quizzes..."));
  await prisma.payment.deleteMany().catch(e => console.log("Clearing payments..."));
  await prisma.chatMessage.deleteMany().catch(e => console.log("Clearing chat messages..."));
  await prisma.course.deleteMany().catch(e => console.log("Clearing courses..."));
  await prisma.siteContent.deleteMany().catch(e => console.log("Clearing site content..."));
  await prisma.category.deleteMany().catch(e => console.log("Clearing categories..."));
  await prisma.user.deleteMany().catch(e => console.log("Clearing users..."));
  console.log('Cleared existing data.');


  // --- 2. Create Categories and Instructors ---
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  console.log('Creating categories...');
  const categories = {
    'Programming': await prisma.category.create({ data: { name: 'Programming', description: 'C, Python, Java, & more' } }),
    'Data Science': await prisma.category.create({ data: { name: 'Data Science', description: 'Machine Learning & Big Data' } }),
    'Artificial Intelligence': await prisma.category.create({ data: { name: 'Artificial Intelligence', description: 'Deep Learning & NLP' } }),
    'Web Development': await prisma.category.create({ data: { name: 'Web Development', description: 'React, Node.js, & PERN' } }),
    'Cloud & DevOps': await prisma.category.create({ data: { name: 'Cloud & DevOps', description: 'AWS, Docker, & Kubernetes' } }),
    'Cybersecurity': await prisma.category.create({ data: { name: 'Cybersecurity', description: 'Ethical Hacking & Security' } }),
    'Computer Science': await prisma.category.create({ data: { name: 'Computer Science', description: 'DBMS, OS, & Networks' } }),
  };
  console.log('Created custom categories.');

  console.log('Creating instructors...');
  const instructors = {
    'Harry': await prisma.user.create({ data: { name: 'Harry', email: 'harry@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Shradha Khapra': await prisma.user.create({ data: { name: 'Shradha Khapra', email: 'shradha@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Vilas Dhar': await prisma.user.create({ data: { name: 'Vilas Dhar', email: 'vilas@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Rohit Negi (Coder Army)': await prisma.user.create({ data: { name: 'Rohit Negi (Coder Army)', email: 'rohit@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Alyssa Lowery': await prisma.user.create({ data: { name: 'Alyssa Lowery', email: 'alyssa@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Jenny': await prisma.user.create({ data: { name: 'Jenny', email: 'jenny@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Shujan Shome': await prisma.user.create({ data: { name: 'Shujan Shome', email: 'shujan@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Varun Singhla': await prisma.user.create({ data: { name: 'Varun Singhla', email: 'varun@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Jen Kramer': await prisma.user.create({ data: { name: 'Jen Kramer', email: 'jenkramer@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Eve Porcello': await prisma.user.create({ data: { name: 'Eve Porcello', email: 'eve@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Angela Yu': await prisma.user.create({ data: { name: 'Angela Yu', email: 'angela@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Christian Hur': await prisma.user.create({ data: { name: 'Christian Hur', email: 'christian@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Oracle University': await prisma.user.create({ data: { name: 'Oracle University', email: 'oracle@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Carlos Nunez': await prisma.user.create({ data: { name: 'Carlos Nunez', email: 'carlos@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Kim Schlesinger': await prisma.user.create({ data: { name: 'Kim Schlesinger', email: 'kim@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Sanghapal S': await prisma.user.create({ data: { name: 'Sanghapal S', email: 'sanghapal@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Michele Vallisneri': await prisma.user.create({ data: { name: 'Michele Vallisneri', email: 'michele@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Isil Berkun': await prisma.user.create({ data: { name: 'Isil Berkun', email: 'isil@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
    'Bryan Li': await prisma.user.create({ data: { name: 'Bryan Li', email: 'bryan@example.com', password: hashedPassword, role: 'INSTRUCTOR' } }),
  };
  console.log('Created custom instructors.');


  // --- 3. Create Custom Site Content ---
   await prisma.siteContent.createMany({
    data: [
      { key: 'hero_headline', value: 'Master In-Demand Tech Skills' },
      { key: 'hero_subtitle', value: 'Master Programming, Data Structures & Algorithms, Web Development, AI, and Cybersecurity with hands-on projects and industry-recognized certificates.' },
      { key: 'partners_headline', value: 'We collaborate with 200+ leading universities and companies' },
      { key: 'potential_headline', value: 'Unlock your potential' },
      { key: 'featured_headline', value: 'Featured courses and programs' },
      { key: 'categories_headline', value: 'Explore top categories' },
      { key: 'cta_headline', value: 'Take the next step toward your personal and professional goals with edusphere' },
    ]
  });
  console.log('Created site content.');


  // --- 4. Create Final Course Catalog (Using EXACT filenames from your `ls` output) ---
  const coursesToCreate = [
    // --- Using local files you provided in `ls` ---
    { title: 'Introduction to Programming in C', category: 'Programming', level: Level.BEGINNER, instructor: 'Harry', link: 'https://youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR&si=nzAHdM7SApiVmONM', thumbnail: '/images/introduction-to-Programming-in-c.jpg' },
    { title: 'Python for Beginners', category: 'Programming', level: Level.BEGINNER, instructor: 'Shradha Khapra', link: 'https://youtube.com/playlist?list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&si=2tg3LEdfuVndvRNv', thumbnail: '/images/python-for-beginners.jpg' },
    { title: 'Object-Oriented Programming with C++', category: 'Programming', level: Level.INTERMEDIATE, instructor: 'Harry', link: 'https://youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL&si=1LZIu0e6Nq0JW5IN', thumbnail: '/images/object-oriented-programming-with-c++.jpg' },
    { title: 'Career Essentials in Generative AI', category: 'Artificial Intelligence', level: Level.ADVANCED, instructor: 'Vilas Dhar', link: 'https://www.linkedin.com/learning/paths/career-essentials-in-generative-ai-by-microsoft-and-linkedin', thumbnail: '/images/career-essentials-in-generative-ai.jpeg' },
    { title: 'Data Structures and Algorithms', category: 'Computer Science', level: Level.INTERMEDIATE, instructor: 'Rohit Negi (Coder Army)', link: 'https://youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01&si=BTOEGqB9zuMvONI0', thumbnail: '/images/data-structures-and-algorithms.jpeg' },
    { title: 'Develop Critical Thinking Skills', category: 'Computer Science', level: Level.ADVANCED, instructor: 'Alyssa Lowery', link: 'https://www.linkedin.com/learning/paths/develop-critical-thinking-decision-making-and-problem-solving-skills', thumbnail: '/images/develop-critical-thinking-skills.jpeg' },
    { title: 'Database Management Systems', category: 'Computer Science', level: Level.INTERMEDIATE, instructor: 'Jenny', link: 'https://youtube.com/playlist?list=PLdo5W4Nhv31b33kF46f9aFjoJPOkdlsRc&si=xl42SMifO5UjJ8Qh', thumbnail: '/images/database-management-systems.jpeg' },
    
    // --- Assuming .jpeg for the rest of the files based on your `ls` output pattern ---
    { title: 'Operating Systems Fundamentals', category: 'Computer Science', level: Level.INTERMEDIATE, instructor: 'Shujan Shome', link: 'https://youtube.com/playlist?list=PLc5rXIqickU2_VgSS5fwa0Di4V7vsaOlr&si=aeLxCPulB9Z3cQUq', thumbnail: '/images/operating-systems-fundamentals.jpeg' },
    { title: 'Computer Networks', category: 'Computer Science', level: Level.INTERMEDIATE, instructor: 'Varun Singhla', link: 'https://youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_&si=nASJhLiv4fSnJFMp', thumbnail: '/images/computer-networks.jpeg' },
    { title: 'Front-End Web Development Career', category: 'Web Development', level: Level.BEGINNER, instructor: 'Jen Kramer', link: 'https://www.linkedin.com/learning/paths/explore-a-career-in-front-end-web-development', thumbnail: '/images/front-end-web-development-career.jpeg' },
    { title: 'Node.js Web Development', category: 'Web Development', level: Level.INTERMEDIATE, instructor: 'Eve Porcello', link: 'https://www.linkedin.com/learning/paths/explore-web-development-with-node-js', thumbnail: '/images/nodejs-web-development.jpeg' },
    { title: 'The Complete Full-Stack Bootcamp', category: 'Web Development', level: Level.ADVANCED, instructor: 'Angela Yu', link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/', thumbnail: '/images/the-complete-full-stack-bootcamp.jpeg' },
    { title: 'Full Stack with Flask', category: 'Web Development', level: Level.ADVANCED, instructor: 'Christian Hur', link: 'httpsD://www.linkedin.com/learning/full-stack-web-development-with-flask', thumbnail: '/images/full-stack-with-flask.jpeg' },
    { title: 'Oracle Cloud Infrastructure Foundations', category: 'Cloud & DevOps', level: Level.BEGINNER, instructor: 'Oracle University', link: 'https: //www.linkedin.com/learning/oracle-cloud-infrastructure-foundations-associate-january-2025', thumbnail: '/images/oracle-cloud-infrastructure-foundations.jpeg' },
    { title: 'Docker Foundations Certificate', category: 'Cloud & DevOps', level: Level.INTERMEDIATE, instructor: 'Carlos Nunez', link: 'https://www.linkedin.com/learning/paths/docker-foundations-professional-certificate', thumbnail: '/images/docker-foundations-certificate.jpeg' },
    { title: 'Getting Started with Kubernetes', category: 'Cloud & DevOps', level: Level.INTERMEDIATE, instructor: 'Kim Schlesinger', link: 'httpsG://www.linkedin.com/learning/paths/getting-started-with-kubernetes', thumbnail: '/images/getting-started-with-kubernetes.jpeg' },
    { title: 'DevOps Foundation', category: 'Cloud & DevOps', level: Level.ADVANCED, instructor: 'Sanghapal S', link: 'httpsG://www.linkedin.com/learning/devops-foundations-23454205', thumbnail: '/images/devops-foundation.jpeg' },
    { title: 'Python Data Analysis', category: 'Data Science', level: Level.BEGINNER, instructor: 'Michele Vallisneri', link: 'httpsG://www.linkedin.com/learning/python-data-analysis-24296803', thumbnail: '/images/python-data-analysis.jpeg' },
    { title: 'Deep Learning with TensorFlow', category: 'Data Science', level: Level.ADVANCED, instructor: 'Isil Berkun', link: 'httpsG://www.linkedin.com/learning/deep-learning-with-tensorflow-insights-and-innovations', thumbnail: '/images/deep-learning-with-tensorflow.jpeg' },
    { title: 'Cybersecurity Career Essentials', category: 'Cybersecurity', level: Level.BEGINNER, instructor: 'Bryan Li', link: 'httpsG://www.linkedin.com/learning/paths/career-essentials-in-cybersecurity-by-microsoft-and-linkedin', thumbnail: '/images/cybersecurity-career-essentials.jpeg' },
  ];

  console.log('Creating courses...');
  for (const courseData of coursesToCreate) {
    const content = courseContentData.find(c => c.title === courseData.title);

    await prisma.course.create({
      data: {
        title: courseData.title,
        level: courseData.level,
        link: courseData.link,
        instructorId: instructors[courseData.instructor].id,
        categoryId: categories[courseData.category].id,
        price: 0, // Assuming all are free for now
        description: content ? content.description : `A comprehensive course on ${courseData.title}.`,
        whatYouWillLearn: content ? content.whatYouWillLearn : [],
        duration: content ? content.duration : 'Self-paced',
        courseContent: content ? content.courseContent : [],
        thumbnail: courseData.thumbnail, // This now contains the correct local path
      },
    });
  }
  console.log('Created final course catalog using all specified local image paths.');


  console.log('Seeding finished.');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });




// ```

// **What to do now:**

// 1.  **Re-run the seed script** in your `server` directory:
//     ```bash
//     npm run prisma:seed
    

