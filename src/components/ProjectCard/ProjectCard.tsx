// src/components/ProjectCard/ProjectCard.tsx
import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    date: string;
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {project.title}
        </h3>
        <p className="mt-2 text-gray-600">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-4">
          {project.liveUrl && (
            <Button
              variant="primary"
              size="sm"
              icon={<Icon name="external-link" size="sm" />}
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              Live Demo
            </Button>
          )}
          {project.githubUrl && (
            <Button
              variant="secondary"
              size="sm"
              icon={<Icon name="github" size="sm" />}
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              View Code
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
