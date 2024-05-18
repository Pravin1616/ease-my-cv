// src/components/Contact.js

import React from 'react';

const Contact = ({ title, fields }) => (
  <section className="resume-section" id="contact">
    <h2>{title}</h2>
    <div>
      {fields.map(field => (
        <div key={field.name}>
          <strong>{field.label}:</strong> <span>{field.default}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Contact;
