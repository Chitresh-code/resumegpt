import type { SkillCardData } from '@/types/structured-outputs';
import { BookOpen } from 'lucide-react';

interface SkillCardProps {
  data: SkillCardData;
}

export default function SkillCard({ data }: SkillCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-gray-700" />
        <h3 className="text-xl font-bold">{data.category}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-black text-white 
                     rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

