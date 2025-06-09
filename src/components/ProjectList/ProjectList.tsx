// src/components/ProjectList/ProjectList.tsx
import React from 'react';
import Carousel from '../Carousel/Carousel';
import Project from '../Project/Project';
import type ProjectType from '../../types/Project';

interface ProjectListProps {
  projects: ProjectType[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Carousel
        slidesToShow={1}
        slidesToScroll={1}
        gap={0}
        showIndicators={true}
        showArrows={true}
      >
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProjectList;
