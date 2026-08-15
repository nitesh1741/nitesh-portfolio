import type {
  Education,
  Experience,
  FaqItem,
  GeoLocation,
  Metric,
  NavItem,
  Profile,
  Project,
  SkillGroup,
} from "@/types/portfolio";

export const siteUrl = "https://nitesh-mehta.com.np";

export const profile: Profile = {
  name: "Nitesh Kumar Mehta",
  role: ".NET Backend & Agentic AI Engineer",
  location: "Hyderabad, Telangana, India",
  origin: "Sunsari, Nepal",
  currentCompany: "CHUBB India",
  intro:
    "Software engineer building .NET microservices, Azure event pipelines, Kafka workflows, Redis caching systems, and practical Agentic AI applications.",
  summary:
    "I build distributed backend systems that stay reliable under production load. At Chubb, I engineered .NET Core microservices processing 5,000+ insurance claims per hour, reduced database load by 60% with Redis and in-memory caching, and shipped event-driven pipelines on Kafka and Azure Service Bus with observability built in.",
  interests: ["Distributed Systems", "Cloud-Native Architecture", "Agentic AI", "Event-Driven Architecture"],
  expertise: [".NET Core", "C#", "Kafka", "Azure Service Bus", "Redis", "Kubernetes", "Microservices", "Python", "LangChain", "React", "Next.js"],
  email: "niteshmehta1741@gmail.com",
  linkedin: "https://www.linkedin.com/in/niteshkrmehta",
  github: "https://github.com/nitesh1741",
  githubSecondary: "https://github.com/nitesh-147",
  resume: "/nitesh-kumar-mehta-resume.pdf",

  // ── SEO fields ──────────────────────────────────────────────────────────
  alternateName: [
    "Nitesh",
    "Neetesh",
    "Nitesh Mehta",
    "Neetesh Mehta",
    "Nitesh K. Mehta",
    "Neetesh Kumar Mehta",
  ],

  homeLocation: {
    city: "Hyderabad",
    district: "Telangana",
    country: "India",
  } satisfies GeoLocation,

  birthPlace: {
    city: "Bhokraha",
    district: "Sunsari",
    country: "Nepal",
  } satisfies GeoLocation,

  // One natural sentence woven into the About section and footer.
  originSentence:
    "Originally from Bhokraha, Sunsari, Nepal — now based in Hyderabad, India.",

  // Used in layout.tsx <meta name="keywords"> and globally.
  seoKeywords: [
    // Name variants
    "Nitesh Kumar Mehta",
    "Nitesh Mehta",
    "Nitesh",
    "Neetesh",
    "Neetesh Mehta",
    "Neetesh Kumar Mehta",
    // Role
    ".NET Backend Engineer",
    "Agentic AI Engineer",
    "Software Engineer",
    "Backend Developer",
    "Full Stack Engineer",
    // Geo — current
    "Software Engineer Hyderabad",
    "Software Engineer Telangana",
    "Backend Engineer India",
    // Geo — origin
    "Software Engineer Nepal",
    "Software Engineer Sunsari",
    "Software Engineer Bhokraha",
    "Developer from Nepal",
    "Nepalese Software Engineer",
    // Employer
    "CHUBB India Engineer",
    "Chubb Technology",
    "Insurance Software Engineer",
    // Education — KIIT
    "KIIT Graduate",
    "KIIT Computer Science",
    "Kalinga Institute of Industrial Technology",
    "KIIT Bhubaneswar",
    // Education — Greenland
    "Greenland International Secondary School",
    "Greenland School Biratnagar",
    // Education — Dover
    "Prakashpur Dover English Academy",
    "Dover English Academy Sunsari",
    // Education — Shanti
    "Shanti Public School Bhokraha",
    "Shanti School Sunsari",
    // Tech
    "Azure Microservices Engineer",
    "Kafka Software Engineer",
    "Redis Caching",
    "Distributed Systems Engineer",
    "LangChain Developer",
    "RAG Developer",
    "TypeScript",
    ".NET Core",
    "C# Developer",
    "Kubernetes Engineer",
  ],

  faqItems: [
    {
      question: "Who is Nitesh Kumar Mehta?",
      answer:
        "Nitesh Kumar Mehta (also spelled Neetesh) is a Software Engineer specialising in .NET Backend and Agentic AI. He currently works at CHUBB India in Hyderabad and is originally from Bhokraha, Sunsari, Nepal.",
    },
    {
      question: "Where does Nitesh Mehta work?",
      answer:
        "Nitesh Mehta works as a Software Engineer at CHUBB India in Hyderabad, Telangana, India, building .NET Core microservices, Kafka event pipelines, and Azure-based distributed systems.",
    },
    {
      question: "Where is Nitesh Kumar Mehta from?",
      answer:
        "Nitesh Kumar Mehta is originally from Bhokraha, Sunsari, Nepal. He completed his schooling at Shanti Public School in Bhokraha and Prakashpur Dover English Academy in Sunsari before moving to India for higher education.",
    },
    {
      question: "Which school did Nitesh Mehta attend?",
      answer:
        "Nitesh Mehta attended Shanti Public School (Bhokraha, Sunsari) for Nursery–5th grade, Prakashpur Dover English Academy (Prakashpur, Sunsari) for 6th–10th grade, and Greenland International Secondary School (Biratnagar, Nepal) for 12th grade.",
    },
    {
      question: "Which university did Nitesh Kumar Mehta graduate from?",
      answer:
        "Nitesh Kumar Mehta graduated with a B.Tech in Computer Science and Engineering from KIIT — Kalinga Institute of Industrial Technology, Bhubaneswar, with a CGPA of 9.13/10.",
    },
    {
      question: "What technologies does Nitesh Mehta specialise in?",
      answer:
        "Nitesh Mehta specialises in .NET Core, C#, Kafka, Azure Service Bus, Redis, Kubernetes, Python, LangChain, RAG, and Agentic AI. He builds distributed backend systems and multi-agent AI applications.",
    },
  ] satisfies FaqItem[],
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
    slug: "stackpilot-agentic-ai-app-builder",
    name: "StackPilot - Agentic AI App Builder",
    seoTitle: "StackPilot Agentic AI App Builder | LangChain Multi-Agent Project",
    seoDescription:
      "Case study for StackPilot, a Python and LangChain multi-agent AI app builder using planner, architect, and coder agents to simulate an end-to-end SDLC.",
    description:
      "Autonomous 3-agent LLM system (Planner, Architect, Coder) using Python and LangChain to simulate a complete end-to-end SDLC.",
    stack: ["Python", "RAG", "Langchain", "Multi-Agent LLM"],
    highlights: [
      "Reduced prototype engineering effort by 80%",
      "Architected scalable prompt orchestration and inter-agent communication pipelines",
      "Engineered execution pipelines across 3 specialized agents"
    ],
    challenge:
      "Prototype software planning often breaks when requirements, architecture decisions, and code generation live in disconnected prompts.",
    solution:
      "StackPilot separates planning, architecture, and coding into specialized agents with structured handoffs, retrieval-aware context, and repeatable execution steps.",
    outcome:
      "The system reduced early prototype effort by 80% while creating a clearer workflow for validating AI-generated architecture and implementation decisions.",
    keywords: ["Agentic AI", "LangChain", "RAG", "multi-agent LLM", "AI app builder", "Python"],
    github: "https://github.com/nitesh1741",
    demo: "",
    accent: "from-cyan-500 to-emerald-500",
  },
  {
    slug: "loksewageeks-digital-education-platform",
    name: "LoksewaGeeks - Digital Education Platform",
    seoTitle: "LoksewaGeeks Digital Education Platform | Next.js and Python Case Study",
    seoDescription:
      "Case study for LoksewaGeeks, a scalable education platform built with Next.js, Python, PostgreSQL, OAuth, MongoDB, and Redis.",
    description:
      "Scaled digital education platform to support 5,000+ projected MAU by architecting modular distributed services across multi-exam domains.",
    stack: ["Python", "Next.js", "PostgreSQL", "OAuth", "MongoDB", "Redis"],
    highlights: [
      "Enhanced performance tracking for 1,000+ mock questions with ML-backed personalized recommendations",
      "Guaranteed 100% user isolation with Google OAuth and strict RBAC",
      "Designed backend architecture from zero with full ownership"
    ],
    challenge:
      "Exam-preparation products need reliable user isolation, fast question delivery, and analytics that can adapt across multiple exam domains.",
    solution:
      "LoksewaGeeks uses modular backend services, OAuth-based identity, PostgreSQL and MongoDB storage, Redis-backed performance paths, and a Next.js frontend.",
    outcome:
      "The platform architecture supports 5,000+ projected monthly active users and 1,000+ mock questions with personalized performance tracking.",
    keywords: ["Next.js", "Python backend", "PostgreSQL", "Redis", "OAuth", "education platform"],
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
  {
    degree: "12th Grade",
    institution: "Greenland International Secondary School - Biratnagar, Nepal",
    coursework: ["GPA: 3.5/4"],
  },
  {
    degree: "6th - 10th Grade",
    institution: "Prakashpur Dover English Academy - Prakashpur, Sunsari",
    coursework: ["GPA: 3.65/4"],
  },
  {
    degree: "Nursery - 5th Grade",
    institution: "Shanti Public School - Bhokraha Narsing - 01, Sunsari",
    coursework: ["Percentage: 92%"],
  },
];
