import type { ProjectCardData } from '@/types/structured-outputs';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  data: ProjectCardData;
}

export default function ProjectCard({ data }: ProjectCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm text-gray-700 mb-1">AI</div>
          <h3 className="text-2xl font-bold text-gray-900">{data.title}</h3>
        </div>
        <div className="text-sm text-gray-700">{data.year}</div>
      </div>
      
      <p className="text-gray-900 mb-4">{data.description}</p>
      
      {data.technologies && data.technologies.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-700 mb-2">
            TECHNOLOGIES
          </div>
          <div className="flex flex-wrap gap-2">
            {data.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-md text-sm text-gray-900"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {data.links && data.links.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <span>Links</span>
          </div>
          <div className="flex flex-col gap-2">
            {data.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2 bg-white 
                         rounded-md border border-gray-200 
                         hover:bg-gray-50 transition-colors text-gray-900"
              >
                <span>{link.label}</span>
                <ExternalLink className="w-4 h-4 text-gray-700" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

