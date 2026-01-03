import { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent border-t border-gray-200/50 backdrop-blur-sm p-6">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-center gap-3 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">
          <div className="pl-5 pr-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about my work, skills, or experience..."
            disabled={disabled}
            className="flex-1 py-4 pr-4 bg-transparent 
                     focus:outline-none text-gray-900 placeholder:text-gray-400
                     disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className="mr-2 w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 
                     disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
                     text-white flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </form>
  );
}

