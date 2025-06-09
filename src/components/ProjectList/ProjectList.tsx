// src/components/ProjectList/ProjectList.tsx
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import type { ProjectCard as ProjectCardType } from '../../types/ProjectCard';

interface ProjectListProps {
  projects: ProjectCardType[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
