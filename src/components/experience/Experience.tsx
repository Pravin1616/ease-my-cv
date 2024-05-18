// src/components/Experience.js

import React from 'react';

const Experience = ({ title, jobs }) => (
  <section className="resume-section" id="experience">
    <h2>{title}</h2>
    {jobs.map((job, index) => (
      <div className="job" key={index}>
        <h3>{job.title}</h3>
        <p>{job.company}, {job.dates}</p>
        <ul>
          {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
        </ul>
      </div>
    ))}
  </section>
);

export default Experience;
