import { ResumeCardData } from '@/types/structured-outputs';
import { Download, FileText } from 'lucide-react';

interface ResumeCardProps {
  data: ResumeCardData;
}

export default function ResumeCard({ data }: ResumeCardProps) {
  const handleDownload = () => {
    if (data.url) {
      window.open(data.url, '_blank');
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg">{data.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.title}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{data.format}</span>
            <span>•</span>
            <span>Updated {data.updatedDate}</span>
            <span>•</span>
            <span>{data.size}</span>
          </div>
        </div>
        
        <button
          onClick={handleDownload}
          className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 
                   text-white flex items-center justify-center transition-colors"
          disabled={!data.url}
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
      
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Click to download the resume
      </p>
    </div>
  );
}

