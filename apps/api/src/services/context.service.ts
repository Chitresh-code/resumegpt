import fs from 'fs';
import path from 'path';
import { PortfolioData, Project, Skill, WorkExperience, Education } from '../types/portfolio';

const userInfoPath = path.join(__dirname, '../data/user-info.json');

export function loadUserInfo(): PortfolioData {
  try {
    const data = fs.readFileSync(userInfoPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading user-info.json:', error);
    throw new Error('Failed to load user information');
  }
}

export function formatUserInfoForPrompt(userInfo: PortfolioData): string {
  let prompt = `You are an AI assistant representing ${userInfo.personalInfo.name}.\n\n`;
  
  prompt += `Personal Information:\n`;
  prompt += `- Name: ${userInfo.personalInfo.name}\n`;
  prompt += `- Bio: ${userInfo.personalInfo.bio}\n`;
  prompt += `- Location: ${userInfo.personalInfo.location}\n`;
  if (userInfo.personalInfo.age) {
    prompt += `- Age: ${userInfo.personalInfo.age}\n`;
  }
  if (userInfo.personalInfo.tagline) {
    prompt += `- Tagline: ${userInfo.personalInfo.tagline}\n`;
  }
  prompt += `\n`;

  if (userInfo.projects && userInfo.projects.length > 0) {
    prompt += `Projects:\n`;
    userInfo.projects.forEach((project: Project, index: number) => {
      prompt += `${index + 1}. ${project.title} (${project.year})\n`;
      prompt += `   Description: ${project.description}\n`;
      if (project.technologies && project.technologies.length > 0) {
        prompt += `   Technologies: ${project.technologies.join(', ')}\n`;
      }
      if (project.links && project.links.length > 0) {
        prompt += `   Links: ${project.links.map((l: { label: string; url: string }) => `${l.label}: ${l.url}`).join(', ')}\n`;
      }
      prompt += `\n`;
    });
  }

  if (userInfo.skills && userInfo.skills.length > 0) {
    prompt += `Skills:\n`;
    userInfo.skills.forEach((skill: Skill) => {
      prompt += `- ${skill.category}: ${skill.skills.join(', ')}\n`;
    });
    prompt += `\n`;
  }

  if (userInfo.workExperience && userInfo.workExperience.length > 0) {
    prompt += `Work Experience:\n`;
    userInfo.workExperience.forEach((exp: WorkExperience) => {
      prompt += `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})\n`;
      prompt += `  ${exp.description}\n`;
      if (exp.technologies && exp.technologies.length > 0) {
        prompt += `  Technologies: ${exp.technologies.join(', ')}\n`;
      }
    });
    prompt += `\n`;
  }

  if (userInfo.education && userInfo.education.length > 0) {
    prompt += `Education:\n`;
    userInfo.education.forEach((edu: Education) => {
      prompt += `- ${edu.degree}${edu.field ? ` in ${edu.field}` : ''} from ${edu.institution}\n`;
      prompt += `  ${edu.startDate} - ${edu.endDate || 'Present'}\n`;
    });
    prompt += `\n`;
  }

  if (userInfo.contactInfo) {
    prompt += `Contact Information:\n`;
    prompt += `- Email: ${userInfo.contactInfo.email}\n`;
    if (userInfo.contactInfo.phone) {
      prompt += `- Phone: ${userInfo.contactInfo.phone}\n`;
    }
    prompt += `- Location: ${userInfo.contactInfo.location}\n`;
    if (userInfo.contactInfo.socialLinks && userInfo.contactInfo.socialLinks.length > 0) {
      prompt += `- Social Links: ${userInfo.contactInfo.socialLinks.map((l: { platform: string; url: string }) => `${l.platform}: ${l.url}`).join(', ')}\n`;
    }
    prompt += `\n`;
  }

  if (userInfo.funFacts && userInfo.funFacts.length > 0) {
    prompt += `Fun Facts:\n`;
    userInfo.funFacts.forEach((fact: string) => {
      prompt += `- ${fact}\n`;
    });
    prompt += `\n`;
  }

  prompt += `\nInstructions:\n`;
  prompt += `- Answer questions about ${userInfo.personalInfo.name} based on the information above.\n`;
  prompt += `- Be friendly, professional, and engaging.\n`;
  prompt += `- When asked about projects, skills, contact info, or resume, provide structured data along with your response.\n`;
  prompt += `- Use the structured output format when appropriate.\n`;

  return prompt;
}

