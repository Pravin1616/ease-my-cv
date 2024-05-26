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
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <Button onClick={onEdit}>Edit</Button>
      </div>
      <div className="text-xl text-gray-600 mb-8">{data.designation}</div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2">Contact Information</h2>
        <div className="mt-4 space-y-2 text-lg">
          <p>Email: <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">{data.email}</a></p>
          <p>Phone: {data.phone}</p>
          <p>LinkedIn: <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.linkedin}</a></p>
          <p>GitHub: <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.github}</a></p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2">Professional Summary</h2>
        <p className="mt-4 text-lg">{data.summary}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2">Skills</h2>
        <p className="mt-4 text-lg">{data.skills}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2">Work Experience</h2>
        {data.work_experience.map((experience, index) => (
          <div key={index} className="mt-4">
            <h3 className="text-xl font-semibold">{experience.company}</h3>
            <p className="text-gray-600">{experience.position}</p>
            <p className="text-gray-600">{experience.duration}</p>
            <p className="mt-2">{experience.responsibilities}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mt-4">
            <h3 className="text-xl font-semibold">{project.project_name}</h3>
            <p className="mt-2">{project.description}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-semibold border-b pb-2">Education</h2>
        {data.education.map((education, index) => (
          <div key={index} className="mt-4">
            <h3 className="text-xl font-semibold">{education.institution}</h3>
            <p className="text-gray-600">{education.degree}</p>
            <p className="text-gray-600">{education.year}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResumeRender;
