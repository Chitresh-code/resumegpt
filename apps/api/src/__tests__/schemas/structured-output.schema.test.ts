import { StructuredOutputSchema } from '../../schemas/structured-output.schema';

describe('Structured Output Schema', () => {
  describe('ProjectCard', () => {
    it('should validate valid project card', () => {
      const validProject = {
        type: 'project',
        title: 'Test Project',
        description: 'Test description',
        year: 2024,
        technologies: ['React', 'TypeScript'],
        links: [{ label: 'GitHub', url: 'https://github.com/test' }],
      };

      const result = StructuredOutputSchema.safeParse(validProject);
      expect(result.success).toBe(true);
    });

    it('should reject invalid project card', () => {
      const invalidProject = {
        type: 'project',
        title: 'Test Project',
        // Missing required fields
      };

      const result = StructuredOutputSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
    });
  });

  describe('SkillCard', () => {
    it('should validate valid skill card', () => {
      const validSkill = {
        type: 'skill',
        category: 'Tech & Product',
        skills: ['Skill 1', 'Skill 2'],
      };

      const result = StructuredOutputSchema.safeParse(validSkill);
      expect(result.success).toBe(true);
    });
  });

  describe('ContactCard', () => {
    it('should validate valid contact card', () => {
      const validContact = {
        type: 'contact',
        email: 'test@example.com',
        location: 'San Francisco, CA',
        socialLinks: [{ platform: 'LinkedIn', url: 'https://linkedin.com/test' }],
      };

      const result = StructuredOutputSchema.safeParse(validContact);
      expect(result.success).toBe(true);
    });
  });

  describe('ResumeCard', () => {
    it('should validate valid resume card', () => {
      const validResume = {
        type: 'resume',
        name: 'John Doe',
        title: 'Software Engineer',
        format: 'PDF',
        updatedDate: 'August 2024',
        size: '0.5 MB',
      };

      const result = StructuredOutputSchema.safeParse(validResume);
      expect(result.success).toBe(true);
    });
  });

  describe('InfoCard', () => {
    it('should validate valid info card', () => {
      const validInfo = {
        type: 'info',
        title: 'Test Title',
        content: 'Test content',
      };

      const result = StructuredOutputSchema.safeParse(validInfo);
      expect(result.success).toBe(true);
    });
  });
});

