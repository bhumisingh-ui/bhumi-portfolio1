export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  highlights: string[];
}

export interface Social {
  platform: "github" | "linkedin" | "leetcode" | "email";
  url: string;
  label: string;
}

export const portfolio = {
  name: "Bhumika Singh",
  firstName: "Bhumika",
  lastName: "Singh",
  role: "Full Stack Web Developer",
  tagline: "Crafting full-stack experiences, one line of code at a time",
  taglineAlt: "Turning ideas into interactive web apps",
  photo: "/assets/bhumika-photo-new.jpg",
  hero: {
    arcText: "BHUMIKA SINGH",
    headline: ["Crafting", "full-stack", "experiences,", "one line of", "code at a time"],
    subtext:
      "Full-stack developer passionate about building complete web platforms — from clean, responsive UIs to robust server architectures. I love turning ambitious ideas into polished, production-ready applications.",
    cta: { label: "View My Work", href: "#projects" },
    ctaSecondary: { label: "Get In Touch", href: "#contact" },
    stats: [
      { value: 100, label: "LeetCode Problems", suffix: "+", animate: true },
      { value: "8.94", label: "CGPA", suffix: "", animate: false },
      { value: "2", label: "Major Projects", suffix: "", animate: false },
    ],
  },
  about: {
    greeting: "Hello!",
    bio: "I'm Bhumika — a full-stack web developer who loves building things that live on the internet. My playground is the Node.js/Express/React ecosystem, where I craft complete platforms from database schemas to pixel-perfect frontends. I care deeply about clean, responsive UI and writing code that's as enjoyable to maintain as it is to use. When I'm not building web apps, you'll find me grinding LeetCode or exploring new technologies to add to my toolkit.",
    education: {
      degree: "B.Tech in Computer Engineering",
      school: "K. J. Somaiya Institute of Technology",
      university: "University of Mumbai",
      period: "May 2023 – May 2027",
      cgpa: "8.94",
    },
    leetcode: {
      count: 100,
      label: "LeetCode Problems Solved",
    },
  },
  skillCategories: [
    {
      id: "languages",
      label: "Languages",
      skills: ["C", "Java", "JavaScript"],
    },
    {
      id: "web-dev",
      label: "Web Development",
      skills: ["HTML5", "CSS3", "Bootstrap", "Node.js", "Express.js"],
    },
    {
      id: "databases",
      label: "Databases & APIs",
      skills: ["MySQL", "MongoDB", "PostgreSQL", "RESTful APIs", "Firebase", "Cloudinary"],
    },
    {
      id: "tools",
      label: "Tools & Platforms",
      skills: ["Git", "GitHub", "Postman", "VS Code", "Microsoft Excel", "PowerPoint"],
    },
  ] satisfies SkillCategory[],
  projects: [
    {
      title: "Wanderlust",
      description:
        "A full-stack Airbnb-like property listing platform with user authentication, reviews, and a responsive mobile-friendly interface. Built end-to-end with the MERN-adjacent stack.",
      tags: ["Node.js", "Express", "MongoDB", "Passport.js", "Bootstrap"],
      liveUrl: "https://wanderlust-uz32.onrender.com/listings",
      highlights: [
        "Full-stack property listing platform with user authentication and reviews",
        "Secure login and session management using Passport.js and Connect-Mongo",
        "Responsive, mobile-friendly UI built with Bootstrap",
      ],
    },
    {
      title: "InterviewPrep",
      description:
        "An AI-powered platform that simulates real technical interviews with timed sessions, dynamic question generation, and performance insights across core CS topics.",
      tags: ["React", "Next.js", "Gemini AI", "Neon.tech", "Clerk"],
      repoUrl: "https://github.com/popeyepie1211/InterviewPrep",
      highlights: [
        "AI-based platform simulating real technical interviews with timed sessions",
        "Dynamic question generation and answer evaluation using Gemini AI",
        "Topic-wise interviews (DSA, OS, DBMS, CS fundamentals) with performance insights",
        "Secure authentication and user management via Clerk",
      ],
    },
    {
      title: "CodeMentor AI",
      description:
        "AI-powered code review platform that helps developers write better code by providing instant feedback, bug detection, performance analysis, code quality suggestions, and automated review reports",
      tags: ["AI", "Code Review", "Developer Tools"],
      repoUrl: "#",
      highlights: [
        "Users upload code or write it directly inside a built-in editor and receive AI-generated feedback within seconds — no need to wait on a senior developer or reviewer",
      ],
    },
  ] satisfies Project[],
  experience: [
    {
      role: "Marketing Team Member",
      organization: "IET Committee, KJSIT",
      period: "Mar 2023 – Mar 2024",
      highlights: [
        "Executed digital marketing and social media campaigns for technical events",
        "Coordinated event promotions and maintained consistent branding across channels",
      ],
    },
  ] satisfies Experience[],
  contact: {
    email: "bhumisingh88868@gmail.com",
    phone: "(+91) 8591005520",
    socials: [
      { platform: "github" as const, url: "https://github.com/bhumisingh-ui", label: "GitHub" },
      { platform: "linkedin" as const, url: "https://www.linkedin.com/in/bhumika-singh-091a55348/", label: "LinkedIn" },
      { platform: "leetcode" as const, url: "https://leetcode.com/u/bhumi_1808/", label: "LeetCode" },
    ] satisfies Social[],
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
};
