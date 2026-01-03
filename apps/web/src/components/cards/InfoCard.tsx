import { InfoCardData } from '@/types/structured-outputs';

interface InfoCardProps {
  data: InfoCardData;
}

export default function InfoCard({ data }: InfoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-3">{data.title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{data.content}</p>
      {data.metadata && Object.keys(data.metadata).length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {JSON.stringify(data.metadata, null, 2)}
          </div>
        </div>
      )}
    </div>
  );
}

