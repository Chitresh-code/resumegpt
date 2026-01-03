import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput from '@/components/chat/ChatInput';

describe('ChatInput', () => {
  it('renders input field', () => {
    render(<ChatInput onSend={() => {}} />);
    const input = screen.getByPlaceholderText('Ask me anything...');
    expect(input).toBeInTheDocument();
  });

  it('calls onSend when form is submitted', () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} />);
    
    const input = screen.getByPlaceholderText('Ask me anything...');
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.submit(form!);
    
    expect(onSend).toHaveBeenCalledWith('Hello');
  });

  it('clears input after sending', () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} />);
    
    const input = screen.getByPlaceholderText('Ask me anything...') as HTMLInputElement;
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.submit(form!);
    
    expect(input.value).toBe('');
  });

  it('does not call onSend if input is empty', () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} />);
    
    const form = screen.getByPlaceholderText('Ask me anything...').closest('form');
    fireEvent.submit(form!);
    
    expect(onSend).not.toHaveBeenCalled();
  });

  it('disables input when disabled prop is true', () => {
    render(<ChatInput onSend={() => {}} disabled />);
    const input = screen.getByPlaceholderText('Ask me anything...');
    expect(input).toBeDisabled();
  });

  it('disables send button when disabled', () => {
    render(<ChatInput onSend={() => {}} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});

