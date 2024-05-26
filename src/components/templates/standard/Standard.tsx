// src/Resume.js

import React, { useState } from 'react';
import { z } from 'zod';
import template from '../../../json/template_1.json';
import './Standard.css';
import Header from '../../header/Header';
import Contact from '../../contact/Contact';
import Summary from '../../summary/Summary';
import Experience from '../../experience/Experience';
import Education from '../../education/Education';
import Skills from '../../skills/Skills';
import Projects from '../../projects/Projects';
import ResumeBuilderForm from './ResumeForm';

// Import section components

// Define Zod schemas for validation
const schemas = {
  contact: z.object({
    email: z.string().email(),
    phone: z.string().min(10),
    linkedin: z.string().url(),
    github: z.string().url()
  })
};

const Standard = () => {
  const renderSection = (section) => {
    switch (section.type) {
      case 'header':
        return <Header key={section.id} title={section.title} subtitle={section.subtitle} />;
      case 'contact':
        return <Contact key={section.id} title={section.title} fields={section.fields} />;
      case 'summary':
        return <Summary key={section.id} title={section.title} content={section.content} />;
      case 'experience':
        return <Experience key={section.id} title={section.title} jobs={section.jobs} />;
      case 'education':
        return <Education key={section.id} title={section.title} schools={section.schools} />;
      case 'skills':
        return <Skills key={section.id} title={section.title} skills={section.skills} />;
      case 'projects':
        return <Projects key={section.id} title={section.title} projects={section.projects} />;
      default:
        return null;
    }
  };

  return (
    <div className="resume-container">
      {/* {template.sections.map(renderSection)} */}
      {<ResumeBuilderForm />}
    </div>
  );
};

export default Standard;
