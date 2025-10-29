const { PrismaClient, Level } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const courseContentData = require('./course_content.js');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // --- 1. Clear All Existing Data ---
  await prisma.enrollment.deleteMany().catch(e => console.log("Clearing enrollments..."));
  await prisma.review.deleteMany().catch(e => console.log("Clearing reviews..."));
  await prisma.lesson.deleteMany().catch(e => console.log("Clearing lessons..."));
  await prisma.module.deleteMany().catch(e => console.log("Clearing modules..."));
  await prisma.course.deleteMany().catch(e => console.log("Clearing courses..."));
  await prisma.siteContent.deleteMany().catch(e => console.log("Clearing site content..."));
  await prisma.category.deleteMany().catch(e => console.log("Clearing categories..."));
  await prisma.user.deleteMany().catch(e => console.log("Clearing users..."));
  console.log('Cleared existing data.');

  // --- 2. Create Categories and Instructors (Your Code) ---
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

  // --- 3. Create Your Custom Site Content (Your Code) ---
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

  // --- 4. Create Your Final Course Catalog (Your Code) ---
  const coursesToCreate = [
    { title: 'Introduction to Programming in C', category: 'Programming', level: Level.BEGINNER, instructor: 'Harry', link: 'https://youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR&si=nzAHdM7SApiVmONM', thumbnail: 'https://media.istockphoto.com/id/484654121/photo/program-code.jpg?s=612x612&w=0&k=20&c=hwEnPRSjWHp-RKuwrdQPJ539E_DNjRMaYvkNSF4VsQM=' },
    { title: 'Python for Beginners', category: 'Programming', level: Level.BEGINNER, instructor: 'Shradha Khapra', link: 'https://youtube.com/playlist?list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&si=2tg3LEdfuVndvRNv', thumbnail: 'https://media.istockphoto.com/id/1284922959/photo/python-inscription-against-laptop-and-code-background-learn-python-programming-language.jpg?s=612x612&w=0&k=20&c=D2LqATyObkpnTHtsin2eHs9ilGEr19Dshuo_1m9y2Tk=' },
    { title: 'Object-Oriented Programming with C++', category: 'Programming', level: Level.INTERMEDIATE, instructor: 'Harry', link: 'https://youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL&si=1LZIu0e6Nq0JW5IN', thumbnail: 'https://imgs.search.brave.com/kwXI1UKD0kwctttn2dZq6szgP14bweDaFI3CtJ9OrqA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2xpZGVzaGFyZWNk/bi5jb20vc3NfdGh1/bWJuYWlscy9wcmVz/ZW50YXRpb25vb3At/MjIwNDEyMTIxNzQy/LXRodW1ibmFpbC5q/cGc_d2lkdGg9NTYw/JmZpdD1ib3VuZHM' },
    { title: 'Career Essentials in Generative AI', category: 'Artificial Intelligence', level: Level.ADVANCED, instructor: 'Vilas Dhar', link: 'https://www.linkedin.com/learning/paths/career-essentials-in-generative-ai-by-microsoft-and-linkedin', thumbnail: 'https://media.licdn.com/dms/image/v2/D560DAQHETRsBvecPxQ/learning-public-banner-crop_300_1400/learning-public-banner-crop_300_1400/0/1716407671362?e=1761573600&v=beta&t=Hsbq2EaFgb0Wacp_pHBBguEyOJny7ElsUTzcM9NTsVc' },
    { title: 'Data Structures and Algorithms', category: 'Computer Science', level: Level.INTERMEDIATE, instructor: 'Rohit Negi (Coder Army)', link: 'https://youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01&si=BTOEGqB9zuMvONI0', thumbnail: 'https://media.licdn.com/dms/image/v2/D560DAQHrmMscOqmJOw/learning-public-crop_144_256/learning-public-crop_144_256/0/1704914636714?e=1761573600&v=beta&t=F4Jh_PrYv29IB2C92kH9B4G4P9nchrRLv9Gze-gjG6g' },
    { title: 'Develop Critical Thinking Skills', category: 'Computer Science', level: Level.ADVANCED, instructor: 'Alyssa Lowery', link: 'https://www.linkedin.com/learning/paths/develop-critical-thinking-decision-making-and-problem-solving-skills', thumbnail: 'https://media.licdn.com/dms/image/v2/C560DAQGAdZiEXB8vSw/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1619797496405?e=1761573600&v=beta&t=Gah6WFRWIvB1K7AfD669z66IITwb2rbGRH-pAVCe8YQ' },
    { title: 'Database Management Systems', category: 'Computer Science', level: Level.INTERMEDIATE, instructor: 'Jenny', link: 'https://youtube.com/playlist?list=PLdo5W4Nhv31b33kF46f9aFjoJPOkdlsRc&si=xl42SMifO5UjJ8Qh', thumbnail: 'https://media.licdn.com/dms/image/v2/D4D0DAQFW4dpBsSvoow/learning-public-crop_144_256/learning-public-crop_144_256/0/1734136975257?e=1761573600&v=beta&t=wwS1CMHo4b6Q5z1nq0EstcK5_pQLSkXqkb5Ej1iB3S0' },
    { title: 'Operating Systems Fundamentals', category: 'Computer Science', level: Level.INTERMEDIATE, instructor: 'Shujan Shome', link: 'https://youtube.com/playlist?list=PLc5rXIqickU2_VgSS5fwa0Di4V7vsaOlr&si=aeLxCPulB9Z3cQUq', thumbnail: 'https://media.licdn.com/dms/image/v2/D4D0DAQHQ7EN5C-Fokw/learning-public-crop_144_256/learning-public-crop_144_256/0/1718215039415?e=1761573600&v=beta&t=uk-2o2wu7vm_Xro-ZymhvSzgZZ_mVfwh2c5etECirRM' },
    { title: 'Computer Networks', category: 'Computer Science', level: Level.INTERMEDIATE, instructor: 'Varun Singhla', link: 'https://youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_&si=nASJhLiv4fSnJFMp', thumbnail: 'https://media.licdn.com/dms/image/v2/D4E0DAQHYXSKchy5Idg/learning-public-crop_144_256/B4EZepIsG9HcAQ-/0/1750889317057?e=1761573600&v=beta&t=FcuhemvYJ4KW9MiOl3LpuiCDqh5EPkgOZ0rOuucBudk' },
    { title: 'Front-End Web Development Career', category: 'Web Development', level: Level.BEGINNER, instructor: 'Jen Kramer', link: 'https://www.linkedin.com/learning/paths/explore-a-career-in-front-end-web-development', thumbnail: 'https://media.licdn.com/dms/image/v2/C4E0DAQFLAheIrgZu5g/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1582672203259?e=1761573600&v=beta&t=cfplz4BK5D97kPoClP4NpnYbi6lu57GU3qAZRG8Jy8g' },
    { title: 'Node.js Web Development', category: 'Web Development', level: Level.INTERMEDIATE, instructor: 'Eve Porcello', link: 'https://www.linkedin.com/learning/paths/explore-web-development-with-node-js', thumbnail: 'https://media.licdn.com/dms/image/v2/C560DAQHctDFCWfBf5Q/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1654187660358?e=1761573600&v=beta&t=u2O561OlPd26s7QNcbou-zTy2XVwd3htgJ85H8vJ9X8' },
    { title: 'The Complete Full-Stack Bootcamp', category: 'Web Development', level: Level.ADVANCED, instructor: 'Angela Yu', link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/', thumbnail: 'https://media.licdn.com/dms/image/v2/C560DAQEiXZnz0UZ2jA/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1622831765332?e=1761573600&v=beta&t=rmdSs4TnjWv2fIDKbqIfHw1GD_w5k0NiWfnbiKMp_nQ' },
    { title: 'Full Stack with Flask', category: 'Web Development', level: Level.ADVANCED, instructor: 'Christian Hur', link: 'https://www.linkedin.com/learning/full-stack-web-development-with-flask', thumbnail: 'https://media.licdn.com/dms/image/v2/C4E0DAQF7J48SzeTWrA/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1569948140533?e=1761573600&v=beta&t=FghYKzDZUs0Tr-8DTP0_OQWzzaMbnWwXNmtbXLKaz2I' },
    { title: 'Oracle Cloud Infrastructure Foundations', category: 'Cloud & DevOps', level: Level.BEGINNER, instructor: 'Oracle University', link: 'https://www.linkedin.com/learning/oracle-cloud-infrastructure-foundations-associate-january-2025', thumbnail: 'https://media.licdn.com/dms/image/v2/D4D0DAQGeUn9hVA0m5w/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1730409465423?e=1761573600&v=beta&t=hv1Ow4pTg26-BO10RuH-1R4jPJ3P51465g7RF2y7j0g' },
    { title: 'Docker Foundations Certificate', category: 'Cloud & DevOps', level: Level.INTERMEDIATE, instructor: 'Carlos Nunez', link: 'https://www.linkedin.com/learning/paths/docker-foundations-professional-certificate', thumbnail: 'https://media.licdn.com/dms/image/v2/D4E0DAQHe-6aaMtHaHQ/learning-public-banner-crop_300_1400/learning-public-banner-crop_300_1400/0/1709917274918?e=1761573600&v=beta&t=l1lK22YQwiJKGUwgd49m14Xq-CwEN66bW6xlsykGZV4' },
    { title: 'Getting Started with Kubernetes', category: 'Cloud & DevOps', level: Level.INTERMEDIATE, instructor: 'Kim Schlesinger', link: 'https://www.linkedin.com/learning/paths/getting-started-with-kubernetes', thumbnail: 'https://media.licdn.com/dms/image/v2/C4E0DAQHmMa6Y-wXQuw/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1582672201291?e=1761573600&v=beta&t=YzXMDL20T32hb_qhzdLwWA12MLEe1Uli4WdzFfE-v-I' },
    { title: 'DevOps Foundation', category: 'Cloud & DevOps', level: Level.ADVANCED, instructor: 'Sanghapal S', link: 'https://www.linkedin.com/learning/devops-foundations-23454205', thumbnail: 'https://media.licdn.com/dms/image/v2/D560DAQEP0x26XHV_6Q/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1707936080464?e=1761573600&v=beta&t=aZSV9_fMFxMLJFHBhbhlW18qPHnO_VpZPX1bDZbSHLo' },
    { title: 'Python Data Analysis', category: 'Data Science', level: Level.BEGINNER, instructor: 'Michele Vallisneri', link: 'https://www.linkedin.com/learning/python-data-analysis-24296803', thumbnail: 'https://media.licdn.com/dms/image/v2/D4D0DAQGSYAIAZElfSA/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1733965184177?e=1761573600&v=beta&t=elb-Dt5dgDvnYR1aJBy9HBqtCvtOjjRpCBR_JauEKgI' },
    { title: 'Deep Learning with TensorFlow', category: 'Data Science', level: Level.ADVANCED, instructor: 'Isil Berkun', link: 'https://www.linkedin.com/learning/deep-learning-with-tensorflow-insights-and-innovations', thumbnail: 'https://media.licdn.com/dms/image/v2/D4D0DAQF3huhzfFmWxQ/learning-public-crop_675_1200/learning-public-crop_675_1200/0/1727298293042?e=1761573600&v=beta&t=lI1uKvXhaiGc0AF1PpJHxFe-aCNl547MyAlLDzyqFS8' },
    { title: 'Cybersecurity Career Essentials', category: 'Cybersecurity', level: Level.BEGINNER, instructor: 'Bryan Li', link: 'https://www.linkedin.com/learning/paths/career-essentials-in-cybersecurity-by-microsoft-and-linkedin', thumbnail: 'https://media.licdn.com/dms/image/v2/D560DAQEx2JrDsQYXvA/learning-public-banner-crop_300_1400/learning-public-banner-crop_300_1400/0/1695663185308?e=1761573600&v=beta&t=oXFEr4loGSI_FLuQazwqQazj9lhMFJnrzIZ1nkJIK98' },
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
        price: 0,
        description: content ? content.description : `A comprehensive course on ${courseData.title}.`,
        whatYouWillLearn: content ? content.whatYouWillLearn : [],
        duration: content ? content.duration : 'Self-paced',
        courseContent: content ? content.courseContent : [],
        thumbnail: courseData.thumbnail || `https://placehold.co/600x400/343A40/FFFFFF?text=${encodeURIComponent(courseData.thumbText)}`,
      },
    });
  }
  console.log('Created final course catalog with dynamic content.');

  console.log('Seeding finished.');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });



// ### **Final Steps**

// Now that your database blueprint and your seeding logic are perfectly in sync, you only need to run two final commands to bring your complete vision to life:

// 1.  **Run the Database Migration:** In your **backend terminal**, run this command one last time to add the new `courseContent` column to your database:
//     ```bash
//     npx prisma migrate dev --name add_course_content_list
//     ```
// 2.  **Rerun the Seed Script:** Once the migration is complete, run your seed command to populate the database with your final, rich course content:
//     ```bash
//     npm run prisma:seed
    

