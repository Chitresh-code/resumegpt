import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashCursor from '@/components/cursor/SplashCursor';
import PreviewCard from '@/components/cards/PreviewCard';

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/chat?query=${encodeURIComponent(query)}`);
    }
  };

  const previewCards = [
    { label: 'Me', icon: '😊', query: 'Who are you? I want to know more about you.' },
    { label: 'Projects', icon: '💼', query: 'Tell me about your projects' },
    { label: 'Skills', icon: '📚', query: 'What are your skills? Give me a list of your soft and hard skills.' },
    { label: 'Fun', icon: '🎉', query: 'Tell me something fun about yourself' },
    { label: 'Contact', icon: '👤', query: 'How can I contact you?' },
    { label: 'Resume', icon: '📄', query: 'Show me your resume' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      <SplashCursor />
      
      <div className="container mx-auto px-4 py-16">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Your Name</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Building the future, one line of code at a time
          </p>
          <p className="text-center max-w-2xl text-gray-700 dark:text-gray-300">
            I'm a passionate developer and AI enthusiast. I love building innovative solutions and exploring the latest technologies.
          </p>
        </div>

        {/* Preview Cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {previewCards.map((card) => (
            <PreviewCard
              key={card.label}
              label={card.label}
              icon={card.icon}
              query={card.query}
            />
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 
                         focus:ring-purple-500 dark:focus:ring-purple-400"
            />
            <button
              type="submit"
              className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 
                       text-white flex items-center justify-center transition-colors"
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
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

