import { useEffect, useRef } from 'react';
import type { ChatMessage as ChatMessageType } from '@/types/structured-outputs';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  messages: ChatMessageType[];
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatWindow({ messages, onSend, isLoading }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-700 mt-12">
              <p className="text-lg">Start a conversation by asking a question!</p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id || Math.random()} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}

