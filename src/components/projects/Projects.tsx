// src/components/Projects.js

import React from 'react';

const Projects = ({ title, projects }) => (
  <section className="resume-section" id="projects">
    <h2>{title}</h2>
    {projects.map((project, index) => (
      <div className="project" key={index}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <a href={project.link}>GitHub Repo</a>
      </div>
    ))}
  </section>
);

export default Projects;
