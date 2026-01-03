import type { ResumeCardData } from '@/types/structured-outputs';
import { Download, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className="bg-gray-50 border-gray-200">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-800" />
          </div>
          
          <div className="flex-1">
            <CardTitle className="text-lg text-gray-900">{data.name}</CardTitle>
            <p className="text-sm text-gray-800">{data.title}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-700">
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
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-800">
          Click to download the resume
        </p>
      </CardContent>
    </Card>
  );
}

