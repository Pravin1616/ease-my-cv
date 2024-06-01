import React, { useState } from 'react';
import template from '../../../json/template_1.json';
import layouts from '../../../json/layout.json';
import ResumeRender from './ResumeRender';
import Skeleton from 'react-loading-skeleton';

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
  const [data, setData] = useState();
  const [selectedTemplate, setSelectedTemplate] = useState();

  React.useEffect(() => {
    if(initialData){
      setData(initialData);
    }
  },[]);

  const handleSelectedTemplate = (layout) => {
    setSelectedTemplate(layout);
  };

  return (
    <>
      {selectedTemplate ? 
        <div className="container mx-auto p-4">
          <div className='max-w-4xl mx-auto'>
            <ResumeRender data={data} layout={selectedTemplate} setSelectedTemplate={setSelectedTemplate}/>
          </div>
        </div> 
        : 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
          {layouts.map((layout, index) => (
  <div
    key={index}
    className="p-4 rounded-lg flex flex-col transition-transform transform hover:scale-105 duration-300"
  >
    <h2 className="text-xl text-gray-800 font-bold py-1">{layout.name}</h2>
    <div className="rounded-lg overflow-hidden shadow-lg" style={{height:'350px'}}>
      {layout.image ? (
        <img src={require(`../../../images/${layout.image}`)} width="100%" alt={layout.name} />
      ) : (
        <Skeleton height={'100%'} />
      )}
    </div>
    <div className="text-center mt-4 flex-1 flex flex-col">
      <button className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300" onClick={() => handleSelectedTemplate(layout)}>
        Preview
      </button>
    </div>
  </div>
))}
        </div>
      }
    </>
  );
};

export default Standard;
