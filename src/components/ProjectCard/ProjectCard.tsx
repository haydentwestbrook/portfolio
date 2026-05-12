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
    <article className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="mt-3 text-gray-600 line-clamp-3">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
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
