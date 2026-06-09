import type {
  Education,
  Experience,
  Metric,
  NavItem,
  Project,
  SkillGroup,
} from "@/types/portfolio";

export const siteUrl = "https://nitesh-portfolio.dev";

export const profile = {
  name: "Nitesh Kumar",
  role: "Software Engineer",
  location: "India",
  currentCompany: "Open to high-impact engineering roles",
  intro:
    "I build clean, reliable software products with a focus on frontend systems, thoughtful user experience, and practical engineering execution.",
  summary:
    "Software Engineer focused on turning ambiguous product ideas into polished, maintainable web experiences. I care about readable interfaces, resilient architecture, performance, and the small interaction details that make tools feel dependable.",
  interests: ["Frontend architecture", "Product engineering", "Developer tooling", "AI-assisted workflows"],
  expertise: ["React", "Next.js", "TypeScript", "Responsive UI", "API integration"],
  email: "nitesh@example.com",
  linkedin: "https://www.linkedin.com/in/nitesh",
  github: "https://github.com/nitesh",
  resume: "/resume.pdf",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const metrics: Metric[] = [
  { label: "Years of Experience", value: "2+" },
  { label: "Projects Built", value: "12+" },
  { label: "Technologies Used", value: "20+" },
  { label: "Hackathons", value: "5+" },
];

export const experiences: Experience[] = [
  {
    company: "Product Engineering Teams",
    position: "Software Engineer",
    duration: "2024 - Present",
    description:
      "Building production-minded web interfaces, improving reusable UI patterns, and integrating application features across frontend and backend boundaries.",
    achievements: [
      "Delivered responsive user interfaces with strong attention to accessibility and performance.",
      "Collaborated across product, design, and engineering to ship clear user workflows.",
      "Improved maintainability by separating content, presentation, and interaction concerns.",
    ],
  },
  {
    company: "Hackathon & Startup Projects",
    position: "Full-Stack Developer",
    duration: "2022 - 2024",
    description:
      "Built prototypes and MVP-style applications under tight timelines, balancing user value, technical scope, and launch readiness.",
    achievements: [
      "Created project demos with clear problem framing and polished end-to-end flows.",
      "Worked with modern frontend stacks, APIs, databases, and deployment platforms.",
      "Practiced rapid iteration while keeping code understandable for future extension.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Portfolio System",
    description:
      "A responsive personal portfolio built to communicate engineering strengths, project evidence, and recruiter-ready contact paths.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: ["SEO-first structure", "Theme persistence", "Accessible section navigation"],
    github: "https://github.com/nitesh/nitesh-portfolio",
    demo: "https://nitesh-portfolio.dev",
    accent: "from-cyan-500 to-emerald-500",
  },
  {
    name: "AI Workflow Assistant",
    description:
      "A productivity interface for organizing tasks, prompts, and structured outputs around repeatable software workflows.",
    stack: ["React", "TypeScript", "Node.js", "REST APIs"],
    highlights: ["Reusable workflow templates", "Fast command surface", "Structured output views"],
    github: "https://github.com/nitesh/ai-workflow-assistant",
    demo: "https://example.com",
    accent: "from-amber-500 to-rose-500",
  },
  {
    name: "Engineering Dashboard",
    description:
      "A focused dashboard concept for tracking project health, delivery status, and technical follow-ups in one place.",
    stack: ["Next.js", "Charts", "TypeScript", "CSS"],
    highlights: ["Dense dashboard layout", "Readable status hierarchy", "Responsive data cards"],
    github: "https://github.com/nitesh/engineering-dashboard",
    demo: "https://example.com",
    accent: "from-violet-500 to-sky-500",
  },
  {
    name: "Hackathon Launch Kit",
    description:
      "A starter kit for quickly presenting hackathon ideas with landing sections, feature cards, and demo-ready structure.",
    stack: ["React", "Vite", "Tailwind CSS", "Vercel"],
    highlights: ["Rapid setup", "Presentation-ready UI", "Reusable content model"],
    github: "https://github.com/nitesh/hackathon-launch-kit",
    demo: "https://example.com",
    accent: "from-lime-500 to-teal-500",
  },
];

export const skillGroups: SkillGroup[] = [
  { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind CSS"] },
  { category: "Backend", skills: ["Node.js", "REST APIs", "Authentication Basics", "Server Rendering"] },
  { category: "Databases", skills: ["PostgreSQL", "MongoDB", "Supabase", "Prisma"] },
  { category: "Cloud & DevOps", skills: ["Vercel", "GitHub Actions", "Netlify", "Docker Basics"] },
  { category: "Programming", skills: ["JavaScript", "TypeScript", "Python", "C++"] },
  { category: "Tools", skills: ["Git", "Figma", "VS Code", "Postman", "ESLint"] },
];

export const education: Education[] = [
  {
    degree: "Bachelor's Degree in Computer Science",
    institution: "Engineering College",
    duration: "2021 - 2025",
    coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering"],
  },
];

