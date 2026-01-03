import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/cards/ProjectCard';
import type { ProjectCardData } from '@/types/structured-outputs';

const mockProjectData: ProjectCardData = {
  type: 'project',
  title: 'Test Project',
  description: 'Test description',
  year: 2024,
  technologies: ['React', 'TypeScript'],
  links: [
    { label: 'GitHub', url: 'https://github.com/test' },
    { label: 'Demo', url: 'https://demo.com' },
  ],
};

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard data={mockProjectData} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectCard data={mockProjectData} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders project year', () => {
    render(<ProjectCard data={mockProjectData} />);
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders technologies', () => {
    render(<ProjectCard data={mockProjectData} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders links', () => {
    render(<ProjectCard data={mockProjectData} />);
    const githubLink = screen.getByText('GitHub');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com/test');
  });

  it('handles missing links', () => {
    const dataWithoutLinks = { ...mockProjectData, links: [] };
    render(<ProjectCard data={dataWithoutLinks} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
});

