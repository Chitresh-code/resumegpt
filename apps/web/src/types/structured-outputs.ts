export type StructuredOutputType = 
  | "project" 
  | "skill" 
  | "contact" 
  | "resume" 
  | "info" 
  | "text";

export interface ProjectCardData {
  type: "project";
  title: string;
  description: string;
  year: number;
  technologies: string[];
  links: { label: string; url: string }[];
}

export interface SkillCardData {
  type: "skill";
  category: string;
  skills: string[];
}

export interface ContactCardData {
  type: "contact";
  email: string;
  phone?: string;
  location: string;
  socialLinks: { platform: string; url: string }[];
}

export interface ResumeCardData {
  type: "resume";
  name: string;
  title: string;
  format: string;
  updatedDate: string;
  size: string;
  url?: string;
}

export interface InfoCardData {
  type: "info";
  title: string;
  content: string;
  metadata?: Record<string, any>;
}

export type StructuredOutput = 
  | ProjectCardData 
  | SkillCardData 
  | ContactCardData 
  | ResumeCardData 
  | InfoCardData;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  structuredData?: StructuredOutput;
  id?: string;
}

export interface ChatResponse {
  message: string;
  structuredData?: StructuredOutput;
}
