// src/components/Education.js

import React from 'react';

const Education = ({ title, schools }) => (
  <section className="resume-section" id="education">
    <h2>{title}</h2>
    {schools.map((school, index) => (
      <div className="education-item" key={index}>
        <h3>{school.degree}</h3>
        <p>{school.institution}, {school.dates}</p>
        <p>{school.gpa}</p>
      </div>
    ))}
  </section>
);

export default Education;
