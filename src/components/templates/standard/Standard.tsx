import React, { useState } from 'react';
import ResumeForm from './ResumeForm';
import template from '../../../json/template_1.json';
import ResumeRender from './ResumeRender';

// Define types for the JSON template
interface Field {
  name: string;
  label: string;
  type: string;
  default: string;
}

interface Section {
  id: string;
  type: string;
  title?: string;
  fields: Field[];
}

interface Template {
  sections: Section[];
}

// Cast template to the correct type
const typedTemplate = template as Template;

const extractInitialData = (sections: Section[]) => {
  const initialData: any = {
    name: '',
    designation: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    summary: '',
    skills: '',
    work_experience: [{}],
    projects: [{}],
    education: [{}],
  };

  sections.forEach((section) => {
    if (section.id === 'work_experience' || section.id === 'projects' || section.id === 'education') {
      initialData[section.id] = [{}];
      section.fields.forEach((field) => {
        initialData[section.id][0][field.name] = field.default;
      });
    } else {
      section.fields.forEach((field) => {
        initialData[field.name] = field.default;
      });
    }
  });

  return initialData;
};

const initialData = extractInitialData(typedTemplate.sections);

const Standard: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (formData: any) => {
    setData(formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className='p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto'>
        {isEditing ? (
          <ResumeForm initialData={data} onSubmit={handleSubmit} />
        ) : (
          <ResumeRender data={data} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default Standard;