
export const OWNER = {
  name: 'Joshua Berbie',
  funBadge: "It was never Barbie bro",
  title: 'Software Engineer',
  tagline: 'I build intuitive and future proof web applications.\nI can design too – hehe.',
  location: 'Batangas, Philippines',
  email: 'joshuaberbie@gmail.com',
  phone: '+63 917 322 7564',
  linkedin: 'https://linkedin.com/in/joshuaberbie',
  github: 'https://github.com/joshuaberbie',
} as const;

export const BIO = {
  paragraph1:
    "I'm a full-stack developer focused on building scalable, user-centered web applications using technologies like Spring Boot and Angular. I work across the stack, from intuitive UI/UX design to reliable back end microservices.",
  paragraph1Highlights: ['Spring Boot', 'Angular', 'UI/UX design'],
  paragraph2:
    "I have experience in end-to-end development, including database management, cloud deployment, and Agile collaboration. I design solutions based on user feedback and ensure they align with real business needs.",
  paragraph2Highlights: ['end-to-end', 'cloud deployment'],
} as const;

export const TRAITS = [
  { word: 'Adaptive', highlight: false, description: 'A chameleon who delivers in fast-changing environments.' },
  { word: 'Analytical', highlight: false, description: 'Turns complex problems into non-complex ones because guessing is never a strategy.' },
  { word: 'Collaborative', highlight: false, description: 'Works seamlessly with teams. Make the job easier, collaborate.' },
  {
    word: 'Creative',
    description: "Designs that don’t just look good, they work.",
  },
] as const;


export interface TechTag {
  label: string;
}

export interface WorkEntry {
  role: string;
  company: string;
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
      role: 'Full Stack Developer | UI/UX Designer',
      company: 'Nexus Elixir Solutions Corp.',
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
      role: 'Software Engineer Internship',
      company: 'Nexus Elixir Solutions Corp.',
      period: 'Feb 2025 – May 2025',
      duration: '4 months',
      durationHighlight: true,
      description:
        "I completed IT bootcamps focused on industry practices and hands-on development, contributed to the application’s UI/UX design, and transformed mockups into functional code integrated with backend microservices. I also collaborated with cross-functional teams to ensure smooth frontend and backend integration.",
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
      description: 'Certified in data analytics concepts including data interpretation, visualization, and analytical tools for decision-making.',
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
      description: 'Completed web development bootcamp focused on modern web technologies and practices.',
    },
    {
      title: 'IT Specialist - Databases',
      issuer: 'Certiport - A Pearson VUE Business',
      year: 'May 2023',
      description: 'Certified in database fundamentals including design, querying, and relational database management.',
      link: 'https://www.credly.com/badges/59f8ba42-f656-4089-a0b5-a0a776d0569a/public_url',
    },
    {
      title: 'Data Analytics Essentials',
      issuer: 'Cisco',
      year: 'Nov 2023',
      description: 'Completed foundational training in data analysis, visualization, and data-driven decision-making using industry-standard tools.',
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
      items: ['Microsoft Office', 'Google Workspace', 'ChatGPT', 'Gemini AI', 'Claude AI', 'Deepseek AI'],
    },
  ] as TechCategory[],
} as const;


export interface Project {
  id: string;
  name: string;
  nameHighlight?: string; 
  description?: string;
  previewBg: string; 
  previewLabel: string; 
  previewSubLabel?: string;
  tags?: string[];
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'hrs',
    name: 'Human Resource System App',
    nameHighlight: 'Human',
    description:
      'A full-stack HR management system with employee records, attendance tracking, payroll, and leave management modules.',
    previewBg: '#1B40F5',
    previewLabel: 'HRS App',
    previewSubLabel: 'HRS',
    tags: ['Spring Boot', 'Angular', 'MongoDB', 'Azure'],
  },
  {
    id: 'chatbot',
    name: 'Unique Chatbot',
    description: 'An AI-powered chatbot with a unique conversational personality built for web integration.',
    previewBg: '#2D2D2D',
    previewLabel: 'Chatbot',
    tags: ['Angular', 'TypeScript', 'AI API'],
  },
  {
    id: 'farm',
    name: 'Oni Farm Management System',
    description: 'Farm operations management system covering crop tracking, inventory, and harvest logs.',
    previewBg: '#3A7D44',
    previewLabel: 'Oni Farm',
    tags: ['Spring Boot', 'Angular', 'MySQL'],
  },
  {
    id: 'pizza',
    name: "Ella's Pizza",
    description: "A food ordering web app for a local pizza brand with a custom UI/UX design.",
    previewBg: '#C0392B',
    previewLabel: "Ella's Pizza",
    tags: ['Angular', 'Figma', 'TailwindCSS'],
  },
  {
    id: 'hrs-ux',
    name: 'HRS App UI/UX',
    description: 'Complete UI/UX design system and prototype for the Human Resource System application.',
    previewBg: '#1B40F5',
    previewLabel: 'HRS UI/UX',
    tags: ['Figma'],
  },
  {
    id: 'wash-ux',
    name: 'On the Wash App UI/UX',
    description: 'Mobile-first UI/UX design for a laundry service booking application.',
    previewBg: '#5B9BD5',
    previewLabel: 'On the Wash',
    tags: ['Figma'],
  },
  {
    id: 'portfolio-ux',
    name: 'Web Portfolio UI/UX',
    description: 'The very Figma design system and prototype behind this portfolio you are viewing.',
    previewBg: '#E87C2E',
    previewLabel: 'Portfolio',
    tags: ['Figma'],
  },
];

export const NAV_LINKS = [
  { label: 'About', anchor: '#hero' },
  { label: 'Experience', anchor: '#experience' },
  { label: 'Projects & Designs', anchor: '#projects' },
] as const;

export const FOOTER_LINKS = NAV_LINKS;