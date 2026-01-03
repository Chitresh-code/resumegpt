import type { StructuredOutput } from '@/types/structured-outputs';
import ProjectCard from './ProjectCard';
import SkillCard from './SkillCard';
import ContactCard from './ContactCard';
import ResumeCard from './ResumeCard';
import InfoCard from './InfoCard';

interface CardRendererProps {
  data: StructuredOutput;
}

export default function CardRenderer({ data }: CardRendererProps) {
  switch (data.type) {
    case 'project':
      return <ProjectCard data={data} />;
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

