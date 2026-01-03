import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Briefcase, BookOpen, Sparkles, Contact, FileText } from 'lucide-react';
import SplashCursor from '@/components/cursor/SplashCursor';
import GlassIcons from '@/components/GlassIcons';

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate('/chat', { state: { initialQuery: query } });
    }
  };

  const previewCards = [
    { 
      label: 'Me', 
      icon: <UserCircle className="w-full h-full" />, 
      cardType: 'me' as const
    },
    { 
      label: 'Projects', 
      icon: <Briefcase className="w-full h-full" />, 
      cardType: 'projects' as const
    },
    { 
      label: 'Skills', 
      icon: <BookOpen className="w-full h-full" />, 
      cardType: 'skills' as const
    },
    { 
      label: 'Fun', 
      icon: <Sparkles className="w-full h-full" />, 
      cardType: 'fun' as const
    },
    { 
      label: 'Contact', 
      icon: <Contact className="w-full h-full" />, 
      cardType: 'contact' as const
    },
    { 
      label: 'Resume', 
      icon: <FileText className="w-full h-full" />, 
      cardType: 'resume' as const
    },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <SplashCursor />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
            <UserCircle className="w-12 h-12 text-gray-800" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Your Name</h1>
          <p className="text-lg text-gray-800 mb-4">
            Building the future, one line of code at a time
          </p>
          <p className="text-center max-w-2xl text-gray-800">
            I'm a passionate developer and AI enthusiast. I love building innovative solutions and exploring the latest technologies.
          </p>
        </div>

        {/* Preview Cards */}
        <div className="mb-12">
          <GlassIcons items={previewCards} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 
                         bg-white focus:outline-none focus:ring-2 
                         focus:ring-purple-500"
            />
            <button
              type="submit"
              className="w-12 h-12 rounded-full bg-gray-500 hover:bg-gray-600 
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

