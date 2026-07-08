export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  linkType: "live" | "code";
  link: string;
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
      { value: 0, label: "LeetCode Problems", suffix: "+", animate: true, fetchLive: "leetcode" },
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
      id: 1,
      title: "Wanderlust",
      subtitle: "Airbnb-Like Property Listing Platform",
      description: "Full-stack property listing platform with user authentication, reviews, and secure session management.",
      tech: ["Node.js", "Express.js", "MongoDB", "Passport.js", "Bootstrap"],
      linkType: "live",
      link: "https://wanderlust-uz32.onrender.com/listings"
    },
    {
      id: 2,
      title: "InterviewPrep",
      subtitle: "AI-Powered Technical Interview Simulator",
      description: "AI-based platform simulating real technical interviews with timed sessions, dynamic question generation, and performance insights across DSA, OS, DBMS, and CS fundamentals.",
      tech: ["React", "Next.js", "Gemini AI", "Neon.tech", "Clerk"],
      linkType: "code",
      link: "https://github.com/popeyepie1211/InterviewPrep"
    },
    {
      id: 3,
      title: "CodeMentor AI",
      subtitle: "AI Code Review Platform",
      description: "AI-powered code review platform providing instant feedback, bug detection, performance analysis, code quality suggestions, and automated review reports.",
      tech: ["AI", "Code Review", "Developer Tools"],
      linkType: "code",
      link: "#" // TODO: add repo link once confirmed
    }
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
