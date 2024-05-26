import React from 'react';
import { Button } from '../../../@/components/ui/button';

interface ResumeRenderProps {
  data: {
    name: string;
    designation: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    summary: string;
    skills: string;
    work_experience: Array<{
      company: string;
      position: string;
      duration: string;
      responsibilities: string;
    }>;
    projects: Array<{
      project_name: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      year: string;
    }>;
  };
  onEdit: () => void;
}

const ResumeRender: React.FC<ResumeRenderProps> = ({ data, onEdit }) => {
  return (
    <div className="p-6">
      <Button onClick={onEdit}>Edit</Button>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-xl">{data.designation}</p>
      </div>
      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-semibold">Contact Information</h2>
        <p>Email: {data.email}</p>
        <p>Phone: {data.phone}</p>
        <p>LinkedIn: <a href={data.linkedin} target="_blank" rel="noopener noreferrer">{data.linkedin}</a></p>
        <p>GitHub: <a href={data.github} target="_blank" rel="noopener noreferrer">{data.github}</a></p>
      </div>
      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-semibold">Professional Summary</h2>
        <p>{data.summary}</p>
      </div>
      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p>{data.skills}</p>
      </div>
      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        {data.work_experience.map((experience, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold">{experience.company}</h3>
            <p>{experience.position}</p>
            <p>{experience.duration}</p>
            <p>{experience.responsibilities}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-semibold">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold">{project.project_name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-semibold">Education</h2>
        {data.education.map((education, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold">{education.institution}</h3>
            <p>{education.degree}</p>
            <p>{education.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeRender;