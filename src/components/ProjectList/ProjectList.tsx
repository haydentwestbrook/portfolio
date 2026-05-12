// src/components/ProjectList/ProjectList.tsx
import React, { useState } from 'react';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { Carousel } from '../Carousel/Carousel';
import type { ProjectCard as ProjectCardType } from '../../types/ProjectCard';
import { Button } from '../Button/Button';
import Icon from '../Icon/Icon';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  date: string;
}

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <section id="projects" className="py-20 px-6 sm:px-8 lg:px-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
              Featured Projects
            </h2>
            <div className="mt-4 h-px w-12 bg-gray-200 dark:bg-gray-700 mx-auto"></div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label={isGridView ? 'Switch to carousel view' : 'Switch to grid view'}
            >
              <span>{isGridView ? 'Carousel' : 'Grid'}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
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
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-12">
              <Carousel
                items={projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
                slidesToShow={1}
                showNavigation={true}
                showIndicators={true}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
