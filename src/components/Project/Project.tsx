// src/components/Project/Project.tsx
import React from "react";

interface ProjectProps {
  image: string;
  name: string;
  description: string;
  link: string;
}

const Project: React.FC<ProjectProps> = ({
  image,
  name,
  description,
  link,
}) => {
  return (
    <div className="project-card">
      <img src={image} alt={name} className="project-image" />
      <h2>{name}</h2>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        Learn more
      </a>
    </div>
  );
};

export default Project;
