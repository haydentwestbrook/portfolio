// src/components/ProjectCard/ProjectCard.tsx
import React from 'react';
import type { ProjectCard as ProjectCardType } from '../../types/ProjectCard';

interface ProjectProps {
  project: ProjectCardType;
}

export const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  return (
    <article className="h-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
        <div className="relative h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
            {project.title}
          </h3>
        </div>
        <div className="p-6 flex-grow">
          <p className="text-gray-600 mb-4">{project.description}</p>
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-4 mt-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
