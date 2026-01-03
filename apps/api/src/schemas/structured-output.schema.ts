import { z } from 'zod';

export const ProjectCardSchema = z.object({
  type: z.literal('project'),
  title: z.string(),
  description: z.string(),
  year: z.number(),
  technologies: z.array(z.string()),
  links: z.array(z.object({
    label: z.string(),
    url: z.string(),
  })),
});

export const SkillCardSchema = z.object({
  type: z.literal('skill'),
  category: z.string(),
  skills: z.array(z.string()),
});

export const ContactCardSchema = z.object({
  type: z.literal('contact'),
  email: z.string(),
  phone: z.string().optional(),
  location: z.string(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string(),
  })),
});

export const ResumeCardSchema = z.object({
  type: z.literal('resume'),
  name: z.string(),
  title: z.string(),
  format: z.string(),
  updatedDate: z.string(),
  size: z.string(),
  url: z.string().optional(),
});

export const InfoCardSchema = z.object({
  type: z.literal('info'),
  title: z.string(),
  content: z.string(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const StructuredOutputSchema = z.discriminatedUnion('type', [
  ProjectCardSchema,
  SkillCardSchema,
  ContactCardSchema,
  ResumeCardSchema,
  InfoCardSchema,
]);

export type StructuredOutput = z.infer<typeof StructuredOutputSchema>;

