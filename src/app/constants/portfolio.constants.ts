export const OWNER = {
  name: 'Joshua Berbie',
  funBadge: 'It was never Barbie bro',
  title: 'Software Engineer',
  tagline: 'I build intuitive and future proof web applications.\nI can design too – hehe.',
  location: 'Batangas, Philippines',
  email: 'joshuaberbie0@gmail.com',
  phone: '+63 977 102 7584',
  linkedin: 'https://linkedin.com/in/joshua-berbie',
  github: 'https://github.com/berbijo',
} as const;

export const BIO = {
  paragraph1:
    "I'm a full-stack developer focused on building scalable, user-centered web applications using technologies like Spring Boot and Angular. I work across the stack, from intuitive UI/UX design to reliable back end microservices.",
  paragraph1Highlights: ['Spring Boot', 'Angular', 'UI/UX design'],
  paragraph2:
    'I have experience in end-to-end development, including database management, cloud deployment, and Agile collaboration. I design solutions based on user feedback and ensure they align with real business needs.',
  paragraph2Highlights: ['end-to-end', 'cloud deployment'],
} as const;

export const TRAITS = [
  {
    word: 'Adaptive',
    highlight: false,
    description: 'A chameleon who delivers in fast-changing environments.',
  },
  {
    word: 'Analytical',
    highlight: false,
    description:
      'Turns complex problems into non-complex ones because guessing is never a strategy.',
  },
  {
    word: 'Collaborative',
    highlight: false,
    description: 'Works seamlessly with teams. Make the job easier, collaborate.',
  },
  {
    word: 'Creative',
    description: 'Designs that don’t just look good, they work.',
  },
] as const;

export interface TechTag {
  label: string;
}

export interface WorkEntry {
  id: string;
  role: string;
  company: string;
  companyLink?: string;
  period: string;
  duration: string;
  durationHighlight: boolean;
  description: string;
  techs: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  description?: string;
}

export interface AwardEntry {
  title: string;
  issuer: string;
  year: string;
  description?: string;
  link?: string;
}

export interface TechCategory {
  category: string;
  items: string[];
}

export const EXPERIENCE = {
  totalExperience: '1 + year of experience',

  work: [
    {
      id: 'nexus-fullstack',
      role: 'Full Stack Developer | UI/UX Designer',
      company: 'Nexus Elixir Solutions Corp.',
      companyLink: 'https://nexuselixir.com/',
      period: 'May 2025 – May 2026',
      duration: '1 year',
      durationHighlight: true,
      description:
        'Develop and maintain full-stack applications aligned with business requirements, covering both frontend and backend development. Design user-centered UI/UX based on client feedback, while managing database architecture and supporting cloud deployment. Collaborate in Agile Scrum processes, communicate regularly with stakeholders, and contribute to team growth through knowledge sharing and mentoring.',
      techs: [
        'Springboot (Java)',
        'Angular (TypeScript)',
        'MongoDB',
        'MySQL Workbench',
        'Microsoft Azure',
        'Git',
        'Docker',
        'Figma',
        'Postman',
        'RabbitMQ',
        'SonarQube',
        'Snyk',
      ],
    },
    {
      id: 'nexus-intern',
      role: 'Software Engineer Internship',
      company: 'Nexus Elixir Solutions Corp.',
      companyLink: 'https://nexuselixir.com/',
      period: 'Feb 2025 – May 2025',
      duration: '4 months',
      durationHighlight: true,
      description:
        'I completed IT bootcamps focused on industry practices and hands-on development, contributed to the application’s UI/UX design, and transformed mockups into functional code integrated with backend microservices. I also collaborated with cross-functional teams to ensure smooth frontend and backend integration.',
      techs: [
        'Springboot (Java)',
        'Angular (TypeScript)',
        'MongoDB',
        'MySQL Workbench',
        'Figma',
        'Postman',
        'RabbitMQ',
      ],
    },
  ] as WorkEntry[],

  education: [
    {
      degree: 'Bachelor of Science in Information Technology Major in Business Analytics',
      school: 'Batangas State University',
      period: '2021 – 2025',
      description: 'Cum Laude graduate',
    },
  ] as EducationEntry[],

  awards: [
    {
      title: 'IT Specialist - Data Analytics',
      issuer: 'Certiport - A Pearson VUE Business',
      year: 'May 2024',
      description:
        'Certified in data analytics concepts including data interpretation, visualization, and analytical tools for decision-making.',
      link: 'https://www.credly.com/badges/f9f2ea12-090b-43d0-8e5e-c8c829cd902d/public_url',
    },
    {
      title: 'PhilNITS IT Passport',
      issuer: 'ITPEC',
      year: 'Oct 2024',
      description: 'IT fundamentals certification exam passer.',
    },
    {
      title: 'Web Development Bootcamp',
      issuer: 'DICT Philippines',
      year: 'Feb 2024',
      description:
        'Completed web development bootcamp focused on modern web technologies and practices.',
    },
    {
      title: 'IT Specialist - Databases',
      issuer: 'Certiport - A Pearson VUE Business',
      year: 'May 2023',
      description:
        'Certified in database fundamentals including design, querying, and relational database management.',
      link: 'https://www.credly.com/badges/59f8ba42-f656-4089-a0b5-a0a776d0569a/public_url',
    },
    {
      title: 'Data Analytics Essentials',
      issuer: 'Cisco',
      year: 'Nov 2023',
      description:
        'Completed foundational training in data analysis, visualization, and data-driven decision-making using industry-standard tools.',
      link: 'https://www.credly.com/badges/f9f2ea12-090b-43d0-8e5e-c8c829cd902d/public_url',
    },
  ] as AwardEntry[],

  technologies: [
    {
      category: 'Languages',
      items: ['Java', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['Spring Boot', 'Angular', 'TailwindCSS', 'GSAP'],
    },
    {
      category: 'Databases',
      items: ['MongoDB', 'MySQL'],
    },
    {
      category: 'DevOps & Cloud',
      items: ['Microsoft Azure', 'Docker', 'Git', 'RabbitMQ'],
    },
    {
      category: 'Testing Frameworks',
      items: ['Jasmine & Karma', 'JUnit & Mockito'],
    },
    {
      category: 'Tools & Design',
      items: ['Figma', 'Postman', 'SonarQube', 'Snyk', 'VS Code', 'IntelliJ IDEA'],
    },
    {
      category: 'Productivity & AI',
      items: [
        'Microsoft Office',
        'Google Workspace',
        'ChatGPT',
        'Gemini AI',
        'Claude AI',
        'Deepseek AI',
      ],
    },
  ] as TechCategory[],
} as const;

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  developmentDate?: string;
  previewImage: string;
  techStack: string[];
  accent?: string;
  gallery?: string[];
  longDescription?: string;
  github?: string;
  figma?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'portfolio',
    name: 'Web Portfolio',
    category: 'Design & Development',

    previewImage: 'assets/projects/portfolio.png',

    description: 'Personal Web Portfolio',

    longDescription:
      'A modern, responsive personal web portfolio built to showcase my experience, technical expertise, creativity, professional journey, and key achievements. Designed with smooth interactions, polished UI/UX, and performance-focused architecture to reflect both my development skills and professional identity.',

    developmentDate: 'May 2026',

    techStack: ['Angular', 'TailwindCSS & SCSS', 'GSAP', 'Figma', 'Vercel'],

    gallery: ['assets/projects/portfolio1.png'],

    github: 'https://github.com/berbijo/JNB-Web-Portfolio/tree/master',
    figma:
      'https://www.figma.com/design/YugezE3m32yCfPddvNCUuL/Personal-Web-Portfolio?node-id=36-18&t=ObpDlOupwpekMr8O-1',
  },
  {
    id: 'hrs',
    name: 'Human Resource System',
    category: 'Design & Development',

    previewImage: 'assets/projects/hrs.webp',

    description:
      'A centralized HR ecosystem for payroll, attendance, employee, task management, and other intraorganizational management.',

    longDescription:
      `The Human Resource System (HRS) was built to replace fragmented, manual HR workflows such as spreadsheet-based time tracking, payroll processing, and employee management, which often led to inefficiencies and data inconsistencies. I developed a centralized, scalable full-stack solution that streamlines these operations while ensuring data accuracy and system performance. This system was custom-built and tailored specifically for internal use by the client organization, so no public repository or live demo is available.
      
      The platform was developed using Angular for a reactive, component-driven UI and Spring Boot for secure RESTful backend services, with MongoDB and MySQL supporting both flexible and relational data needs. State management was optimized using NgRx to improve data flow and reduce redundant API calls. Key features include real-time time tracking, automated payroll computation, and role-based access control, significantly improving operational efficiency and scalability.`.trim(),

    developmentDate: 'April 2026',

    techStack: [
      'Angular (TypeScript)',
      'Spring Boot (Java)',
      'SCSS',
      'MongoDB',
      'MySQL Workbench',
      'RabbitMQ',
      'Azure',
      'Docker',
    ],

    gallery: [
      'assets/projects/hrs1.png',
      'assets/projects/hrs2.png',
      'assets/projects/hrs3.png',
      'assets/projects/hrs4.png',
    ],
  },
  {
    id: 'wash',
    name: 'On the Wash App',
    category: 'Design',

    previewImage: 'assets/projects/wash.webp',

    description:
      'A minimalist and modern UI design for On the wash, a laundry shop on-the-go mobile application.',

    longDescription:
      'A modern UI/UX design mockup for an app (On the Wash), basically a rollinglaundry shop. focused on delivering a clean, minimalist, and user-friendly experience. Designed to emphasize intuitive navigation, seamless booking flows, and visually polished interfaces tailored for usability and accessibility. ',

    developmentDate: 'December 2025',

    techStack: ['Figma', 'Canva'],

    gallery: ['assets/projects/wash1.png'],

    github: '',
    figma:
      'https://www.figma.com/design/xxux3YbQXJ9OUYRGX3TYs1/On-the-Wash---App-Prototype?node-id=0-1&t=9PesBW4gLLvcfysa-1',
  },
  {
    id: 'chatbot',
    name: 'UniQue Chatbot',
    category: 'Development',

    previewImage: 'assets/projects/chatbot.webp',

    description: 'Web based ChatBot for University related questions and matters.',

    longDescription:
      `This web-based chatbot serves as a 24/7 digital concierge for the university, centralizing campus information and administrative services into a single conversational interface. It eliminates the frustration of navigating complex faculty websites or waiting in long queues for basic inquiries like campus directions or document requests. By leveraging a self-trained .pkl model with custom NLP logic, the system accurately identifies student intent, providing instant, reliable answers to FAQs and automating the distribution of essential university documents.
      
      The system's architecture blends a Flask and Python backend for intelligent processing with a reliable PHP and XAMPP environment for overall web management and data handling. The integration of AJAX and jQuery ensures a smooth, real-time chat experience, allowing students to interact with the bot without disruptive page refreshes. This flexible and scalable solution reduces the administrative burden on university staff while offering students a modern, efficient way to manage their academic needs.`.trim(),

    developmentDate: 'December 2024',

    techStack: ['HTML/CSS', 'Python', 'Flask', 'PHP', 'XAMPP', 'JavaScript', 'JQuery', 'AJAX'],

    gallery: [
      'assets/projects/chatbot1.png',
      'assets/projects/chatbot2.png',
      'assets/projects/chatbot3.png',
      'assets/projects/chatbot4.png',
    ],

    github: 'https://github.com/berbijo/University-Query-Chatbot',
  },
  {
    id: 'farm',
    name: 'Oni Farm Management System',
    category: 'Development',

    previewImage: 'assets/projects/oni.webp',

    description: 'A locally deployed management system for Oni Farm.',

    longDescription:
      `This farm management system is a robust, locally deployed solution designed to centralize and automate the complexities of modern agriculture. By integrating land and crop tracking with comprehensive tool and stock management, the platform eliminates the traditional pain points of fragmented record-keeping and manual inventory checks. The inclusion of machine learning for yield prediction allows farmers to move beyond guesswork, providing data-driven insights that optimize harvest cycles and resource allocation. Developed with a focus on stability and speed, the system ensures that vital farm data from daily task assignments to long-term farmer management is accessible and organized in one secure, local environment.
      
      The application leverages a reliable tech stack featuring PHP and XAMPP for a high-performance local backend, paired with a responsive HTML/CSS and JavaScript frontend. To ensure a seamless user experience, AJAX and jQuery are utilized to handle data updates and stock tracking in real-time without needing to refresh the page. This eliminates the frustration of slow processing and data entry lag, offering an intuitive interface that simplifies technical farm operations. By digitizing everything from soil health to equipment maintenance, the system empowers users to focus on productivity rather than administrative overhead.`.trim(),

    developmentDate: 'May 2024',

    techStack: ['HTML/CSS', 'PHP', 'XAMPP', 'JavaScript', 'AJAX', 'JQuery'],

    gallery: [
      'assets/projects/oni1.png',
      'assets/projects/oni2.png',
      'assets/projects/oni3.png',
      'assets/projects/oni4.png',
    ],

    github: 'https://github.com/berbijo/Oni-Farm-Mangement-System',
  },
  {
    id: 'pizza',
    name: "Ella's pizza",
    category: 'Development',

    previewImage: 'assets/projects/ellas.webp',

    description: "An online pizza ordering and visit reservation system for Ella's Pizza.",

    longDescription:
      `This web-based platform streamlines the entire dining experience for a pizza restaurant by integrating real-time online ordering and table reservations into a single, cohesive interface. It eliminates the common frustrations of busy phone lines and manual booking errors, allowing customers to customize their orders and secure a table in just a few clicks. For the business, the system automates order flow and capacity management, ensuring that the kitchen and floor staff can focus on service rather than administrative bottlenecks.
      
      Built on a robust PHP and XAMPP architecture, the application provides a fast and secure environment for managing sensitive customer data and menu updates. The frontend utilizes AJAX and jQuery to ensure a dynamic, flicker-free experience allowing users to add toppings or check table availability instantly without page reloads. This modern approach replaces outdated paper-based systems with a sleek, responsive solution that enhances operational efficiency and customer satisfaction.`.trim(),

    developmentDate: 'November 2023',
    techStack: ['HTML/CSS', 'PHP', 'XAMPP', 'JavaScript', 'AJAX', 'JQuery'],

    gallery: [
      'assets/projects/ellas1.png',
      'assets/projects/ellas2.png',
      'assets/projects/ellas3.png',
      'assets/projects/ellas4.png',
    ],

    github: 'https://github.com/berbijo/Pizza-Online-Ordering-Reservation',
  },
];

export const NAV_LINKS = [
  { label: 'About', anchor: '#hero' },
  { label: 'Experience', anchor: '#experience' },
  { label: 'Projects & Designs', anchor: '#projects' },
  { label: 'Hire Me', anchor: '#contact' },
] as const;

export const FOOTER_LINKS = NAV_LINKS;
