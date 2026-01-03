import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Briefcase, BookOpen, Sparkles, Contact, FileText } from 'lucide-react';
import SplashCursor from '@/components/cursor/SplashCursor';
import GlassIcons from '@/components/GlassIcons';
import type { PersonalInfo } from '@/types/portfolio';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/api/personal`);
        if (response.ok) {
          const data = await response.json();
          setPersonalInfo(data.personalInfo);
        }
      } catch (error) {
        console.error('Error fetching personal info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

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
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 relative z-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          {loading ? (
            <div className="flex flex-col items-center w-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center animate-pulse">
                <UserCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <div className="h-7 sm:h-8 w-40 sm:w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-5 sm:h-6 w-56 sm:w-64 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-4 w-72 sm:w-96 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : personalInfo ? (
            <>
              {personalInfo.image ? (
                <img
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 object-cover border-2 border-gray-200"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const iconDiv = document.createElement('div');
                      iconDiv.className = 'w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center';
                      iconDiv.innerHTML = '<svg class="w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>';
                      parent.insertBefore(iconDiv, target);
                    }
                  }}
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                  <UserCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-800" />
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900 text-center px-4">{personalInfo.name}</h1>
              {personalInfo.tagline && (
                <p className="text-base sm:text-lg text-gray-800 mb-4 text-center px-4">
                  {personalInfo.tagline}
                </p>
              )}
              {/* <p className="text-center max-w-2xl text-gray-800">
                {personalInfo.bio}
              </p> */}
              {personalInfo.location && (
                <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center px-4">
                  {personalInfo.location}
                </p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <UserCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-800" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900 text-center px-4">Your Name</h1>
              <p className="text-base sm:text-lg text-gray-800 mb-4 text-center px-4">
                Building the future, one line of code at a time
              </p>
              <p className="text-center max-w-2xl text-gray-800 px-4 text-sm sm:text-base">
                I'm a passionate developer and AI enthusiast. I love building innovative solutions and exploring the latest technologies.
              </p>
            </div>
          )}
        </div>

        {/* Preview Cards */}
        <div className="mb-8 sm:mb-12 px-2 ">
          <GlassIcons items={previewCards} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2.5 sm:py-3 rounded-full border border-gray-300 
                         bg-white focus:outline-none focus:ring-2 text-sm sm:text-base
                         focus:ring-purple-500"
            />
            <button
              type="submit"
              title="Send message"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-500 hover:bg-gray-600 
                       text-white flex items-center justify-center transition-colors shrink-0"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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

