import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PreviewCardProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  query?: string;
  className?: string;
}

export default function PreviewCard({ label, icon: Icon, query, className }: PreviewCardProps) {
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
        'bg-gray-100 hover:bg-gray-200',
        'transition-colors duration-200',
        'text-sm font-medium',
        className
      )}
    >
      {Icon && <Icon className="w-5 h-5 text-gray-800" />}
      <span className="text-gray-900">{label}</span>
    </button>
  );
}

