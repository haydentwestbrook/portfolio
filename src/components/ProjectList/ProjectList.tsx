// src/components/ProjectList/ProjectList.tsx
import React from "react";
import Project from "../Project/Project";

interface Project {
  image: string;
  name: string;
  description: string;
  link: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="projects-list">
      {projects.map((project, index) => (
        <Project key={index} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;
