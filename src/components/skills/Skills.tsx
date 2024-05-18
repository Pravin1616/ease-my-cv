// src/components/Skills.js

import React from 'react';

const Skills = ({ title, skills }) => (
  <section className="resume-section" id="skills">
    <h2>{title}</h2>
    <ul>
      {skills.map((skill, index) => <li key={index}>{skill}</li>)}
    </ul>
  </section>
);

export default Skills;
