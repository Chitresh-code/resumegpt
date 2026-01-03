import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, StructuredOutput } from '@/types/structured-outputs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);

  // Keep messagesRef in sync with messages state
  messagesRef.current = messages;

  const addCardMessage = useCallback((structuredData: StructuredOutput, message: string, projects?: any[]) => {
    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: message,
      structuredData,
      id: Date.now().toString(),
    };
    // Store projects in a custom property if provided (for ProjectsCarousel)
    if (projects && projects.length > 0) {
      (assistantMessage as any).projects = projects;
    }
    setMessages((prev) => [...prev, assistantMessage]);
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      id: Date.now().toString(),
    };

    setMessages((prev) => {
      const updated = [...prev, userMessage];
      messagesRef.current = updated;
      return updated;
    });
    setIsLoading(true);
    setError(null);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationHistory: messagesRef.current.slice(0, -1), // Exclude the current user message
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let structuredData: StructuredOutput | null = null;
      let messageContent = '';

      // Create assistant message
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: '',
        id: (Date.now() + 1).toString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              
              if (parsed.type === 'structuredData' && parsed.data) {
                structuredData = parsed.data;
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastMessage = updated[updated.length - 1];
                  if (lastMessage.role === 'assistant') {
                    lastMessage.structuredData = structuredData!;
                  }
                  return updated;
                });
              } else if (parsed.type === 'message' && parsed.data) {
                messageContent += parsed.data;
                // Add a small delay to slow down streaming for better readability
                await new Promise(resolve => setTimeout(resolve, 30));
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastMessage = updated[updated.length - 1];
                  if (lastMessage.role === 'assistant') {
                    lastMessage.content = messageContent;
                  }
                  return updated;
                });
              }
            } catch (e) {
              // Skip invalid JSON
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return;
      }
      setError(err.message || 'Failed to send message');
      setMessages((prev) => prev.slice(0, -1)); // Remove the assistant message on error
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    stop,
    addCardMessage,
  };
}

