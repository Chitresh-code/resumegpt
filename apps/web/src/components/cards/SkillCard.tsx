import { SkillCardData } from '@/types/structured-outputs';

interface SkillCardProps {
  data: SkillCardData;
}

export default function SkillCard({ data }: SkillCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📚</span>
        <h3 className="text-xl font-bold">{data.category}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black 
                     rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

