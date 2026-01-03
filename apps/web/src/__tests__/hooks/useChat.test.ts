import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useChat } from '@/hooks/useChat';

// Mock fetch
globalThis.fetch = vi.fn() as any;

describe('useChat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with empty messages', () => {
    const { result } = renderHook(() => useChat());
    
    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('sends message and updates state', async () => {
    const mockResponse = {
      ok: true,
      body: {
        getReader: () => ({
          read: async () => ({ done: true, value: undefined }),
        }),
      },
    };

    (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useChat());

    await result.current.sendMessage('Hello');

    await waitFor(() => {
      expect(result.current.messages.length).toBeGreaterThan(0);
    });
  });

  it('handles errors gracefully', async () => {
    (globalThis.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useChat());

    await result.current.sendMessage('Hello');

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });

  it('clears messages', () => {
    const { result } = renderHook(() => useChat());

    result.current.clearMessages();

    expect(result.current.messages).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});

