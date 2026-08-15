export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type Metric = {
  label: string;
  value: string;
};

export type Experience = {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
};

export type Project = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  stack: string[];
  highlights: string[];
  challenge: string;
  solution: string;
  outcome: string;
  keywords: string[];
  github: string;
  demo: string;
  accent: string;
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export type Education = {
  degree: string;
  institution: string;
  duration?: string;
  coursework?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  sections: {
    heading: string;
    body: string;
  }[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type GeoLocation = {
  city: string;
  district: string;
  country: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  origin: string;
  currentCompany: string;
  intro: string;
  summary: string;
  interests: string[];
  expertise: string[];
  email: string;
  linkedin: string;
  github: string;
  githubSecondary: string;
  resume: string;
  // SEO additions
  alternateName: string[];
  homeLocation: GeoLocation;
  birthPlace: GeoLocation;
  faqItems: FaqItem[];
  originSentence: string;
  seoKeywords: string[];
};
