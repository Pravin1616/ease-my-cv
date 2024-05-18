// src/components/Summary.js

import React from 'react';

const Summary = ({ title, content }) => (
  <section className="resume-section" id="summary">
    <h2>{title}</h2>
    <p>{content}</p>
  </section>
);

export default Summary;
