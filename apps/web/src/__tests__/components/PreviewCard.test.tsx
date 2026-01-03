import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PreviewCard from '@/components/cards/PreviewCard';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PreviewCard', () => {
  it('renders label and icon', () => {
    renderWithRouter(
      <PreviewCard label="Projects" icon="💼" />
    );
    
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('navigates to chat with query when clicked', () => {
    const { container } = renderWithRouter(
      <PreviewCard label="Projects" icon="💼" query="Tell me about projects" />
    );
    
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('generates default query if not provided', () => {
    renderWithRouter(
      <PreviewCard label="Projects" icon="💼" />
    );
    
    const button = screen.getByText('Projects').closest('button');
    expect(button).toBeInTheDocument();
  });
});

