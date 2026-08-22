import type {
  CPProfile,
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
  role: "Full-Stack, Cloud & Agentic AI Engineer",
  location: "Hyderabad, Telangana, India",
  origin: "Sunsari, Nepal",
  currentCompany: "CHUBB India",
  intro:
    "Software engineer building cloud-native Kubernetes infrastructure, .NET full-stack services, Azure Functions pipelines, and Agentic AI applications.",
  summary:
    "I build cloud-native infrastructure and full-stack .NET systems at enterprise scale. At Chubb, I architect zero-downtime Kubernetes deployments across 20+ microservices in four global regions, lead disaster recovery provisioning, and ship Azure Functions-backed services. I actively use Agentic AI and Claude Code to accelerate delivery — recognised with the Chubb Excellence Award in Q3 2024.",
  interests: ["Cloud-Native Architecture", "Agentic AI", "Distributed Systems", "Kubernetes & DevOps"],
  expertise: [".NET Core", "C#", "Kubernetes", "Azure Functions", "Python", "FastAPI", "Next.js", "Angular", "LangChain", "Claude Code", "PostgreSQL", "Docker"],
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
        "Nitesh Mehta specialises in .NET Core, C#, Python, Kubernetes, Azure Functions, FastAPI, Next.js, LangChain, RAG, and Agentic AI. He builds cloud-native full-stack systems and LLM-powered applications.",
    },
  ] satisfies FaqItem[],
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Compete", href: "#compete" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const metrics: Metric[] = [
  { label: "Years of Experience", value: "2+" },
  { label: "Kubernetes Microservices", value: "20+" },
  { label: "Global Regions Served", value: "4" },
  { label: "DSA Problems Solved", value: "2,000+" },
];

export const experiences: Experience[] = [
  {
    company: "CHUBB India",
    position: "Software Engineer",
    duration: "June 2024 - Present",
    description:
      "Full-stack and cloud infrastructure engineering across 20+ Kubernetes microservices spanning North America, LATAM, APAC, and Europe — shipping zero-downtime deployments, disaster recovery systems, and Azure Functions-backed services.",
    achievements: [
      "Architected zero-downtime blue-green deployment and rollback strategies with security-driven pod lifecycle management across 20+ Kubernetes microservices spanning four global regions — enforcing 90-day pod rotation and enabling instant rollback without redeploying vulnerable builds.",
      "Spearheaded disaster recovery and multi-region infrastructure provisioning for the full suite of claims-processing APIs, decommissioning 50+ stale duplicate deployments across 13+ APIs to reduce cluster resource overhead.",
      "Built an attachment processing service from scratch for the File Note API, implementing asynchronous virus scanning, AES encryption, and automated retry via Azure Functions — eliminating manual intervention for failed uploads.",
      "Actively leverage Claude Code in daily development — Skills, Agents, and structured SDLC methods — applying systematic debugging and structured brainstorming to accelerate delivery.",
      "Awarded the Chubb Excellence Award (Q3 2024) for outstanding project delivery and end-to-end API ownership.",
    ],
  },
  {
    company: "CHUBB India",
    position: "Software Engineer Intern",
    duration: "September 2023 - May 2024",
    description:
      "Structured onboarding in backend and cloud infrastructure — trained on .NET Core and Angular fundamentals within the DCP claims-processing microservices ecosystem.",
    achievements: [
      "Trained in .NET Core and Angular fundamentals and onboarded onto the Claims processing project, gaining working knowledge of the DCP microservices ecosystem.",
      "Authored unit tests using XUnit for the DCP Task API (.NET), strengthening test coverage and service reliability.",
      "Developed a WinForms monitoring tool (.NET / C#) to track Azure Storage Tables and Blobs, improving hardware resource monitoring and data integrity tracking.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "portfolio-chat-agent",
    name: "Portfolio Chat Agent",
    seoTitle: "Portfolio Chat Agent | RAG Chatbot with GROQ API and Qdrant",
    seoDescription:
      "Case study for a conversational AI chat agent built with Python, GROQ API, Qdrant Vector DB, and a RAG pipeline to answer natural language queries about Nitesh Mehta's background and projects.",
    description:
      "Conversational AI agent enabling portfolio visitors to query background, experience, and projects in natural language — powered by a RAG pipeline over a personal knowledge base.",
    stack: ["Python", "GROQ API", "Qdrant Vector DB", "RAG"],
    highlights: [
      "Grounded LLM responses in accurate personal context via a RAG pipeline over a Qdrant vector store",
      "Architected LLM calls via GROQ API with embedding storage for low-latency semantic retrieval",
      "Deployed as the live chat backend for this portfolio site"
    ],
    challenge:
      "Portfolio visitors have no structured way to explore background, experience, and projects — static pages force linear reading with no ability to ask targeted questions.",
    solution:
      "A RAG-backed conversational agent retrieves relevant personal context from a Qdrant vector store and feeds it to an LLM via GROQ API, grounding every answer in real data.",
    outcome:
      "Visitors can ask questions in plain English and receive grounded, accurate answers about experience, projects, and background — without scrolling through the entire site.",
    keywords: ["RAG", "GROQ API", "Qdrant", "LangChain", "Agentic AI", "Python", "portfolio chatbot"],
    github: "https://github.com/nitesh1741",
    demo: "",
    accent: "from-violet-500 to-cyan-500",
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
    category: "Languages",
    skills: ["C++", "C#", "Python"]
  },
  {
    category: "Full-Stack Development",
    skills: [".NET Core", "FastAPI", "Next.js", "Angular"]
  },
  {
    category: "Agentic AI & LLM Engineering",
    skills: ["RAG", "Prompt Engineering", "LLM Orchestration", "LangChain", "Claude Code"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["Azure (Functions, Key Vault, App Insights, Logs, Storage)", "Kubernetes", "Docker", "Git", "GitHub Actions"]
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB"]
  },
  {
    category: "Certifications",
    skills: ["Claude 101 – Anthropic (LLM agent tooling & prompt engineering)"]
  },
];

export const education: Education[] = [
  {
    degree: "B.Tech Computer Science and Engineering",
    institution: "KIIT - Kalinga Institute of Industrial Technology",
    duration: "August 2020 - June 2024",
    coursework: ["CGPA: 9.13/10", "Ranked top 7% globally (#1,532 of 22,000+) in Google Kick Start 2022", "Solved 2,000+ DSA problems (LeetCode, CodeChef, Codeforces)"],
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

// ── Competitive Programming ──────────────────────────────────────
export const cpProfile: CPProfile = {
  totalSolved: 2000,
  platforms: [
    {
      name: "LeetCode",
      handle: "nitesh1741",
      solvedCount: 1000,
      url: "https://leetcode.com/u/nitesh1741/",
    },
    {
      name: "CodeChef",
      handle: "nitesh1741",
      solvedCount: 500,
      url: "https://www.codechef.com/users/nitesh1741",
    },
    {
      name: "Codeforces",
      handle: "nitesh1741",
      solvedCount: 100,
      url: "https://codeforces.com/profile/nitesh1741",
    },
  ],
  contests: [
    {
      name: "Google Kick Start 2022",
      rank: 1532,
      totalParticipants: 22000,
      year: 2022,
    },
  ],
};
