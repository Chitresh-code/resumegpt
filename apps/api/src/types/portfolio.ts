export interface PersonalInfo {
  name: string;
  bio: string;
  image: string;
  location: string;
  age?: number;
  tagline?: string;
}

export interface Project {
  title: string;
  description: string;
  year: number;
  technologies: string[];
  links: { label: string; url: string }[];
  category?: string;
}

export interface Skill {
  category: string;
  skills: string[];
  proficiency?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  socialLinks: { platform: string; url: string }[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  workExperience?: WorkExperience[];
  education?: Education[];
  contactInfo: ContactInfo;
  funFacts?: string[];
  resume?: {
    name: string;
    title: string;
    format: string;
    updatedDate: string;
    size: string;
    url?: string;
  };
}

