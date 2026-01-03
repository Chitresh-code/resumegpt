import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PreviewCardProps {
  label: string;
  icon: React.ReactNode;
  query?: string;
  className?: string;
}

export default function PreviewCard({ label, icon, query, className }: PreviewCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (query) {
      navigate(`/chat?query=${encodeURIComponent(query)}`);
    } else {
      navigate(`/chat?query=${encodeURIComponent(`Tell me about ${label.toLowerCase()}`)}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-full',
        'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
        'transition-colors duration-200',
        'text-sm font-medium',
        className
      )}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

