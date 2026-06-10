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
  name: string;
  description: string;
  stack: string[];
  highlights: string[];
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

