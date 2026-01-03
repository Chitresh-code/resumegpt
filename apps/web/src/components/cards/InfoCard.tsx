import type { InfoCardData } from '@/types/structured-outputs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InfoCardProps {
  data: InfoCardData;
}

export default function InfoCard({ data }: InfoCardProps) {
  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-900">{data.content}</p>
        {data.metadata && Object.keys(data.metadata).length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              {JSON.stringify(data.metadata, null, 2)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

