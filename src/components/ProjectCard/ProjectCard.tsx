// src/components/ProjectCard/ProjectCard.tsx
import React from 'react';
import { Button } from '../Button/Button';
import Icon from '../Icon/Icon';

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
    <article className="group bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600">
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
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
    </article>
  );
};
