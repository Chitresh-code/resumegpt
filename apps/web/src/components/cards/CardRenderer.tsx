import type { StructuredOutput } from '@/types/structured-outputs';
import ProjectsCarousel from './ProjectsCarousel';
import SkillCard from './SkillCard';
import ContactCard from './ContactCard';
import ResumeCard from './ResumeCard';
import InfoCard from './InfoCard';

interface CardRendererProps {
  data: StructuredOutput;
  projects?: any[];
}

export default function CardRenderer({ data, projects }: CardRendererProps) {
  switch (data.type) {
    case 'project':
      // Use projects array if provided, otherwise use single data
      return <ProjectsCarousel projects={projects && projects.length > 0 ? projects : [data]} />;
    case 'skill':
      return <SkillCard data={data} />;
    case 'contact':
      return <ContactCard data={data} />;
    case 'resume':
      return <ResumeCard data={data} />;
    case 'info':
      return <InfoCard data={data} />;
    default:
      return null;
  }
}

