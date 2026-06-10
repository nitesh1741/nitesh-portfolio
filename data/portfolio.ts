import type {
  Education,
  Experience,
  Metric,
  NavItem,
  Project,
  SkillGroup,
} from "@/types/portfolio";

export const siteUrl = "https://nitesh-mehta.com.np";

export const profile = {
  name: "Nitesh Kumar Mehta",
  role: "Software Engineer",
  location: "Hyderabad, Telangana, India",
  origin: "Sunsari, Nepal",
  currentCompany: "CHUBB India",
  intro:
    "High-impact Software Engineer with 2+ years of experience architecting highly concurrent distributed systems and production-grade Agentic AI pipelines.",
  summary:
    "I build distributed backend systems that stay up at scale. At Chubb, I've engineered microservices processing 5,000+ claims per hour, reduced database load by 60% using Redis and in-memory caching strategies, and built event-driven pipelines on Kafka and Azure Service Bus that run reliably in production. I design for failure before I write for success.",
  interests: ["Distributed Systems", "Cloud-Native Architecture", "Agentic AI", "Event-Driven Architecture"],
  expertise: [".NET Core", "C#", "Kafka", "Azure", "Kubernetes", "Microservices", "Python", "React", "Next.js"],
  email: "niteshmehta1741@gmail.com",
  linkedin: "https://www.linkedin.com/in/niteshkrmehta",
  github: "https://github.com/nitesh1741",
  githubSecondary: "https://github.com/nitesh-147",
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
  { label: "Claims Processed/Hr", value: "5,000+" },
  { label: "DB Load Reduction", value: "60%" },
  { label: "DSA Problems Solved", value: "3,000+" },
];

export const experiences: Experience[] = [
  {
    company: "CHUBB India",
    position: "Software Engineer",
    duration: "June 2024 - Present",
    description:
      "Architected and shipped scalable .NET Core microservices processing 5,000+ insurance claims per hour, improving system throughput and fault tolerance across distributed services.",
    achievements: [
      "Slashed API latency by 45% and supported 5,000+ concurrent requests/hour by architecting low-latency .NET Core microservices through async I/O tuning and database access pattern refinements.",
      "Decreased database load by 60% and accelerated static data retrieval by 3x by implementing a multi-layer distributed caching strategy utilizing Redis and in-memory optimizations.",
      "Achieved 99.8% reliability for multi-region claim processing workflows by engineering fault-tolerant, event-driven Kafka pipelines featuring idempotent consumers and DLQ routing.",
      "Reduced incident detection and resolution time by 70% by deploying comprehensive Azure Application Insights observability infrastructure and developing a dynamic middleware FileNoteAPI for enterprise claim-processing.",
    ],
  },
  {
    company: "Chubb",
    position: "Technology Intern",
    duration: "September 2023 - June 2024",
    description:
      "Completed hands-on training in .NET + Angular full-stack development and gained experience with Azure cloud services, CI/CD, and deployment pipelines.",
    achievements: [
      "Built backend APIs, handled database integrations (SQL), and implemented best coding practices.",
      "Developed unit tests (XUnit, JUnit) improving code coverage and stability.",
      "Collaborated with senior engineers in enterprise-level microservice environments.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "StackPilot - Agentic AI App Builder",
    description:
      "Autonomous 3-agent LLM system (Planner, Architect, Coder) using Python and LangChain to simulate a complete end-to-end SDLC.",
    stack: ["Python", "RAG", "Langchain", "Multi-Agent LLM"],
    highlights: [
      "Reduced prototype engineering effort by 80%",
      "Architected scalable prompt orchestration and inter-agent communication pipelines",
      "Engineered execution pipelines across 3 specialized agents"
    ],
    github: "https://github.com/nitesh1741",
    demo: "",
    accent: "from-cyan-500 to-emerald-500",
  },
  {
    name: "LoksewaGeeks - Digital Education Platform",
    description:
      "Scaled digital education platform to support 5,000+ projected MAU by architecting modular distributed services across multi-exam domains.",
    stack: ["Python", "Next.js", "PostgreSQL", "OAuth", "MongoDB", "Redis"],
    highlights: [
      "Enhanced performance tracking for 1,000+ mock questions with ML-backed personalized recommendations",
      "Guaranteed 100% user isolation with Google OAuth and strict RBAC",
      "Designed backend architecture from zero with full ownership"
    ],
    github: "",
    demo: "",
    accent: "from-amber-500 to-rose-500",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Technical Domains",
    skills: ["Agentic AI", "RAG", "Prompt Engineering", "LLM Orchestration", "Microservices", "Event-Driven Design", "REST APIs", "System Design"]
  },
  {
    category: "Languages",
    skills: ["Python", "Java", "C#", "C++", "JavaScript", "TypeScript"]
  },
  {
    category: "Frameworks & Libraries",
    skills: [".NET Core", "Spring Boot", "Next.js", "Angular", "React", "LangChain", "CrewAI", "Claude Code"]
  },
  {
    category: "Tools, Cloud & DBs",
    skills: ["Azure (Functions, Service Bus, App Insights)", "Kafka", "Redis", "Docker", "Kubernetes", "Git", "PostgreSQL", "MongoDB", "Azure SQL", "MySQL"]
  },
  {
    category: "Certifications",
    skills: ["Claude 101 - Anthropic", "Responsive Web Design", "Problem Solving (Intermediate) - HackerRank", "React Basic"]
  },
];

export const education: Education[] = [
  {
    degree: "B.Tech Computer Science and Engineering",
    institution: "KIIT - Kalinga Institute of Industrial Technology",
    duration: "August 2020 - June 2024",
    coursework: ["CGPA: 9.13/10", "Ranked top 7% globally (#1,532 of 22,000+) in Google Kick Start 2022", "Solved 3,000+ DSA problems (LeetCode, GFG, CodeChef)"],
  },
];
