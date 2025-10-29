// This is your final, complete content hub for all course-specific text.
const courseContent = [
    // Programming
    {
        title: 'Introduction to Programming in C',
        description: 'Learn the fundamentals of C programming, covering syntax, data types, control structures, and functions to build a strong foundation. This course is perfect for beginners with no prior programming experience.',
        whatYouWillLearn: ['Understand fundamental programming concepts.', 'Write, compile, and execute C programs.', 'Learn about variables, data types, and operators.', 'Master control flow with if-else statements and loops.'],
        courseContent: ['Introduction to C', 'Variables and Data Types', 'Operators and Expressions', 'Control Structures', 'Functions and Modular Programming', 'Arrays and Strings', 'Pointers and Memory', 'Mini Projects'],
        duration: 'Approx. 15 hours'
    },
    {
        title: 'Python for Beginners',
        description: 'Start your programming journey with Python. This course covers the basics of Python syntax, data structures, and functions, preparing you for more advanced topics.',
        whatYouWillLearn: ['Master the basics of Python syntax.', 'Work with fundamental data types like strings, numbers, and lists.', 'Understand how to write and call functions.', 'Build your first simple Python scripts and applications.'],
        courseContent: ['Introduction to Python', 'Data Types and Variables', 'Control Flow', 'Functions and Modules', 'File Handling', 'Projects for Practice'],
        duration: 'Approx. 10 hours'
    },
    {
        title: 'Object-Oriented Programming with C++',
        description: 'Dive deep into object-oriented principles with C++. This course covers classes, objects, inheritance, and polymorphism, essential for building complex software.',
        whatYouWillLearn: ['Understand the principles of OOP.', 'Design and implement classes and objects.', 'Learn about inheritance and polymorphism.', 'Manage memory effectively in C++.'],
        courseContent: ['OOP Basics', 'Classes and Objects', 'Constructors & Destructors', 'Inheritance and Polymorphism', 'Templates and Exception Handling', 'Project Work'],
        duration: 'Approx. 25 hours'
    },
    {
        title: 'Career Essentials in Generative AI',
        description: 'Explore the world of Generative AI and learn how to apply it in your career with insights from Microsoft and LinkedIn experts.',
        whatYouWillLearn: ['Understand what Generative AI is and how it works.', 'Learn the ethical considerations of using AI.', 'Explore practical applications of AI in business.', 'Develop a framework for AI-driven innovation.'],
        courseContent: ['AI Fundamentals', 'Generative Models Overview', 'Applications in Real Life', 'Ethics and Future Trends'],
        duration: 'Approx. 8 hours'
    },
    // Computer Science
    {
        title: 'Data Structures and Algorithms',
        description: 'A deep dive into essential data structures and algorithms to write efficient code and solve complex computational problems.',
        whatYouWillLearn: ['Implement arrays, linked lists, stacks, and queues.', 'Understand tree and graph data structures.', 'Analyze algorithm complexity with Big O notation.', 'Solve common coding interview problems.'],
        courseContent: ['Introduction to DSA', 'Arrays and Linked Lists', 'Stacks and Queues', 'Trees and Graphs', 'Sorting and Searching', 'Complexity Analysis'],
        duration: 'Approx. 40 hours'
    },
    {
        title: 'Develop Critical Thinking Skills',
        description: 'Enhance your professional value by developing essential skills in critical thinking, strategic decision-making, and effective problem-solving.',
        whatYouWillLearn: ['Apply logical and structured thinking.', 'Evaluate arguments and identify biases.', 'Develop creative solutions to complex problems.', 'Make better, more informed decisions.'],
        courseContent: ['Critical Thinking Basics', 'Decision Frameworks', 'Problem Analysis', 'Practical Case Studies'],
        duration: 'Approx. 6 hours'
    },
    {
        title: 'Database Management Systems',
        description: 'Understand relational models, SQL queries, normalization, and database design with real-world examples.',
        whatYouWillLearn: ['Design robust relational database schemas.', 'Write complex SQL queries to manipulate data.', 'Understand the principles of normalization.', 'Learn about transaction management and concurrency.'],
        courseContent: ['Introduction to Databases', 'Relational Model', 'SQL Basics and Advanced Queries', 'Normalization and Keys', 'Transactions', 'Projects'],
        duration: 'Approx. 30 hours'
    },
    {
        title: 'Operating Systems Fundamentals',
        description: 'Explore the core concepts of modern operating systems, including process management, memory management, and file systems.',
        whatYouWillLearn: ['Understand the role of an operating system.', 'Learn about processes, threads, and scheduling.', 'Explore memory management techniques.', 'Grasp the fundamentals of file systems.'],
        courseContent: ['Introduction to OS', 'Process Management', 'Threads and Concurrency', 'Memory and File Management', 'Security and Virtualization'],
        duration: 'Approx. 20 hours'
    },
    {
        title: 'Computer Networks',
        description: 'Learn the principles of computer networking, from the physical layer up to the application layer, including TCP/IP and routing.',
        whatYouWillLearn: ['Understand the OSI and TCP/IP models.', 'Learn about IP addressing and subnetting.', 'Explore routing and switching protocols.', 'Grasp the basics of network security.'],
        courseContent: ['Network Basics', 'OSI Layers', 'Routing & Switching', 'TCP/IP Protocols', 'Network Security', 'Troubleshooting Labs'],
        duration: 'Approx. 25 hours'
    },
    // Web Development
    {
        title: 'Front-End Web Development Career',
        description: 'Discover the world of front-end development. Learn about HTML, CSS, and JavaScript, and what it takes to become a front-end developer.',
        whatYouWillLearn: ['Understand the role of a front-end developer.', 'Learn HTML and CSS for structure and styling.', 'Add interactivity with JavaScript.', 'Build responsive, modern websites.'],
        courseContent: ['HTML5 Basics', 'CSS3 Styling', 'JavaScript Fundamentals', 'Responsive Design', 'Mini Projects'],
        duration: 'Approx. 5 hours'
    },
    {
        title: 'Node.js Web Development',
        description: 'Learn how to build scalable, high-performance backend services with Node.js, the popular JavaScript runtime.',
        whatYouWillLearn: ['Understand the Node.js event loop.', 'Build a web server with the Express framework.', 'Work with modules and npm.', 'Build REST APIs and connect databases.'],
        courseContent: ['Node.js Fundamentals', 'Express Framework', 'Database Integration', 'REST APIs', 'Authentication and Deployment'],
        duration: 'Approx. 18 hours'
    },
    {
        title: 'The Complete Full-Stack Bootcamp',
        description: 'Become a full-stack web developer with just one course. Learn HTML, CSS, Javascript, Node, React, PostgreSQL, and more.',
        whatYouWillLearn: ['Build 16 real-world web projects.', 'Master front-end and back-end technologies.', 'Deploy full-fledged websites.', 'Work on freelance-ready projects.'],
        courseContent: ['Front-End (HTML, CSS, JS)', 'Backend (Node, Express)', 'Databases (PostgreSQL)', 'Deployment and Projects'],
        duration: 'Approx. 60 hours'
    },
    {
        title: 'Full Stack with Flask',
        description: 'Learn to build powerful web applications using Python and the Flask microframework, covering both front-end and back-end development.',
        whatYouWillLearn: ['Set up Flask environment.', 'Build RESTful APIs.', 'Use Jinja templates for dynamic HTML.', 'Integrate SQLAlchemy and authentication.'],
        courseContent: ['Flask Setup', 'Routing and Templates', 'Database with SQLAlchemy', 'APIs and Authentication', 'Deployment'],
        duration: 'Approx. 22 hours'
    },
    // Cloud & DevOps
    {
        title: 'Oracle Cloud Infrastructure Foundations',
        description: 'Prepare for the Oracle Cloud Infrastructure (OCI) Foundations Associate certification with this comprehensive course.',
        whatYouWillLearn: ['Understand OCI core services.', 'Learn OCI networking and compute.', 'Explore security and compliance.', 'Prepare for certification.'],
        courseContent: ['Cloud Basics', 'OCI Architecture', 'Security & Networking', 'Certification Practice'],
        duration: 'Approx. 12 hours'
    },
    {
        title: 'Docker Foundations Certificate',
        description: 'Master the fundamentals of Docker and containerization to build, ship, and run applications anywhere.',
        whatYouWillLearn: ['Understand containers and images.', 'Build Dockerfiles.', 'Manage multi-container setups with Compose.', 'Optimize Docker workflows.'],
        courseContent: ['Docker Basics', 'Building Images', 'Networking & Volumes', 'Compose & Projects'],
        duration: 'Approx. 16 hours'
    },
    {
        title: 'Getting Started with Kubernetes',
        description: 'Learn how to deploy, manage, and scale containerized applications using Kubernetes, the industry-standard orchestration platform.',
        whatYouWillLearn: ['Understand Kubernetes architecture.', 'Deploy and scale applications.', 'Use Pods, Services, and Deployments.', 'Apply advanced cluster management.'],
        courseContent: ['Kubernetes Basics', 'Pods & Deployments', 'ConfigMaps & Secrets', 'Scaling & Self-Healing'],
        duration: 'Approx. 20 hours'
    },
    {
        title: 'DevOps Automation in 1 Hour',
        description: 'A fast-paced introduction to DevOps automation, covering the principles of CI/CD and how to build a basic pipeline.',
        whatYouWillLearn: ['Understand CI/CD fundamentals.', 'Learn CI tools and workflows.', 'Automate builds and deployments.', 'Set up a working CI/CD pipeline.'],
        courseContent: ['Intro to DevOps', 'CI/CD Basics', 'Tools Overview', 'Hands-on Pipeline'],
        duration: 'Approx. 1 hour'
    },
    // Data Science & AI
    {
        title: 'Python Data Analysis',
        description: 'Learn to analyze data using Python with powerful libraries like Pandas, NumPy, and Matplotlib.',
        whatYouWillLearn: ['Load and clean data with Pandas.', 'Perform numerical operations with NumPy.', 'Create visualizations with Matplotlib.', 'Analyze real-world datasets.'],
        courseContent: ['Data Handling', 'NumPy Basics', 'Visualization', 'Projects and Insights'],
        duration: 'Approx. 18 hours'
    },
    {
        title: 'Deep Learning with TensorFlow',
        description: 'Explore the world of deep learning and build neural networks using Google\'s TensorFlow framework.',
        whatYouWillLearn: ['Understand neural networks.', 'Build deep models.', 'Use CNNs and RNNs.', 'Apply models to real-world data.'],
        courseContent: ['Intro to Neural Networks', 'TensorFlow Basics', 'CNNs & RNNs', 'Training and Evaluation'],
        duration: 'Approx. 35 hours'
    },
    // Cybersecurity
    {
        title: 'Cybersecurity Career Essentials',
        description: 'Start your journey in cybersecurity with this introductory course covering core concepts, threats, and defense strategies.',
        whatYouWillLearn: ['Understand cybersecurity basics.', 'Identify threats and vulnerabilities.', 'Learn about defense mechanisms.', 'Explore cybersecurity career roles.'],
        courseContent: ['Security Fundamentals', 'Threat Landscape', 'Network and System Security', 'Career Preparation'],
        duration: 'Approx. 7 hours'
    },
];

module.exports = courseContent;

