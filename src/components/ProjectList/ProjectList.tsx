// src/components/ProjectList/ProjectList.tsx
import React, { useState } from 'react';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { Carousel } from '../Carousel/Carousel';
import type { ProjectCard as ProjectCardType } from '../../types/ProjectCard';

interface ProjectListProps {
  projects: ProjectCardType[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
        >
          <span>{isGridView ? 'View as Carousel' : 'View as Grid'}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {isGridView ? (
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            ) : (
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
            )}
          </svg>
        </button>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <Carousel
          items={projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
          slidesToShow={1}
          showNavigation={true}
          showIndicators={true}
        />
      )}
    </div>
  );
};

export default ProjectList;
