import { loadUserInfo, formatUserInfoForPrompt } from '../../services/context.service';

describe('Context Service', () => {
  describe('loadUserInfo', () => {
    it('should load user info from JSON file', () => {
      const userInfo = loadUserInfo();

      expect(userInfo).toBeDefined();
      expect(userInfo.personalInfo).toBeDefined();
      expect(userInfo.personalInfo.name).toBeDefined();
      expect(userInfo.personalInfo.bio).toBeDefined();
    });

    it('should have required fields', () => {
      const userInfo = loadUserInfo();

      expect(userInfo.personalInfo).toHaveProperty('name');
      expect(userInfo.personalInfo).toHaveProperty('bio');
      expect(userInfo.personalInfo).toHaveProperty('location');
      expect(userInfo).toHaveProperty('projects');
      expect(userInfo).toHaveProperty('skills');
      expect(userInfo).toHaveProperty('contactInfo');
    });
  });

  describe('formatUserInfoForPrompt', () => {
    it('should format user info as string', () => {
      const userInfo = loadUserInfo();
      const prompt = formatUserInfoForPrompt(userInfo);

      expect(typeof prompt).toBe('string');
      expect(prompt.length).toBeGreaterThan(0);
    });

    it('should include personal information', () => {
      const userInfo = loadUserInfo();
      const prompt = formatUserInfoForPrompt(userInfo);

      expect(prompt).toContain(userInfo.personalInfo.name);
      expect(prompt).toContain(userInfo.personalInfo.bio);
    });

    it('should include projects if available', () => {
      const userInfo = loadUserInfo();
      const prompt = formatUserInfoForPrompt(userInfo);

      if (userInfo.projects && userInfo.projects.length > 0) {
        expect(prompt).toContain('Projects:');
        expect(prompt).toContain(userInfo.projects[0].title);
      }
    });

    it('should include skills if available', () => {
      const userInfo = loadUserInfo();
      const prompt = formatUserInfoForPrompt(userInfo);

      if (userInfo.skills && userInfo.skills.length > 0) {
        expect(prompt).toContain('Skills:');
      }
    });

    it('should include contact info', () => {
      const userInfo = loadUserInfo();
      const prompt = formatUserInfoForPrompt(userInfo);

      expect(prompt).toContain('Contact Information:');
      expect(prompt).toContain(userInfo.contactInfo.email);
    });
  });
});

