import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import type { ProjectCardData } from '@/types/structured-outputs';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ExternalLink, Briefcase } from 'lucide-react';

interface ProjectsCarouselProps {
  projects: ProjectCardData[];
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 };
const BASE_WIDTH = 320;
const CONTAINER_PADDING = 16;
const ITEM_WIDTH = BASE_WIDTH - CONTAINER_PADDING * 2;
const TRACK_ITEM_OFFSET = ITEM_WIDTH + GAP;

interface CarouselItemProps {
  item: ProjectCardData;
  index: number;
  trackItemOffset: number;
  x: ReturnType<typeof useMotionValue<number>>;
  transition: { type: string; stiffness: number; damping: number } | { duration: number };
  onItemClick: (item: ProjectCardData) => void;
}

function CarouselItem({ 
  item, 
  index, 
  trackItemOffset, 
  x, 
  transition,
  onItemClick 
}: CarouselItemProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={`${item.title}-${index}`}
      className="relative shrink-0 flex flex-col items-start justify-start bg-gray-50 border border-gray-200 rounded-xl overflow-hidden cursor-pointer"
      style={{
        width: ITEM_WIDTH,
        height: '260px',
        rotateY: rotateY,
      }}
      transition={transition as any}
      onClick={() => onItemClick(item)}
    >
      <div className="p-5 w-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-gray-700" />
          </div>
          <div className="text-xs text-gray-500">{item.year}</div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-gray-700 line-clamp-3">{item.description}</p>
        {item.technologies && item.technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {item.technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700"
              >
                {tech}
              </span>
            ))}
            {item.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">+{item.technologies.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectCardData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const x = useMotionValue(0);
  const [isJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleItemClick = (project: ProjectCardData) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = Math.max(0, projects.length - 1);
      return Math.max(0, Math.min(next, max));
    });
  };

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  const dragProps = {
    dragConstraints: {
      left: -TRACK_ITEM_OFFSET * Math.max(projects.length - 1, 0),
      right: 0
    }
  };

  if (projects.length === 0) return null;

  return (
    <>
      <div className="relative overflow-hidden p-4 rounded-2xl border border-gray-200 bg-white mx-auto" style={{ width: `${BASE_WIDTH}px` }}>
        <div style={{ height: '280px' }}>
          <motion.div
            className="flex h-full"
            drag={isAnimating ? false : 'x'}
            {...dragProps}
            style={{
              width: ITEM_WIDTH,
              gap: `${GAP}px`,
              perspective: 1000,
              perspectiveOrigin: `${position * TRACK_ITEM_OFFSET + ITEM_WIDTH / 2}px 50%`,
              x
            }}
            onDragEnd={handleDragEnd}
          animate={{ x: -(position * TRACK_ITEM_OFFSET) }}
          transition={effectiveTransition as any}
            onAnimationStart={handleAnimationStart}
            onAnimationComplete={handleAnimationComplete}
          >
            {projects.map((project, index) => (
              <CarouselItem
                key={`${project.title}-${index}`}
                item={project}
                index={index}
                trackItemOffset={TRACK_ITEM_OFFSET}
                x={x}
                transition={effectiveTransition}
                onItemClick={handleItemClick}
              />
            ))}
          </motion.div>
        </div>
        <div className="flex w-full justify-center">
          <div className="mt-4 flex w-[150px] justify-between px-8">
            {projects.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                  position === index ? 'bg-gray-700' : 'bg-gray-300'
                }`}
                animate={{
                  scale: position === index ? 1.2 : 1
                }}
                onClick={() => setPosition(index)}
                transition={{ duration: 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="max-h-[90vh] bg-white">
            <div className="mx-auto w-full max-w-2xl">
              <DrawerHeader className="text-left">
                <DrawerTitle className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.title}</DrawerTitle>
                <DrawerDescription className="text-base text-gray-700">
                  {selectedProject.description}
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Year</div>
                    <div className="text-lg text-gray-900">{selectedProject.year}</div>
                  </div>
                  
                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Technologies</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-gray-100 rounded-md text-sm font-medium text-gray-900 border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedProject.links && selectedProject.links.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Links</div>
                      <div className="flex flex-row gap-2">
                        {selectedProject.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-900 group flex-1"
                          >
                            <span className="font-medium">{link.label}</span>
                            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <DrawerFooter className="border-t border-gray-200">
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

