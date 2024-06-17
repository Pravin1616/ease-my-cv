import React, { useState, useEffect } from "react";
import {
  Pencil1Icon,
  Cross1Icon,
  DownloadIcon,
  DotFilledIcon,
  EnvelopeClosedIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons"; // Importing icons from Radix
import ResumeForm from "./ResumeForm";
import { Button } from "../../../@/components/ui/button";
import * as htmlToImage from "html-to-image";
import { PhoneIcon } from "lucide-react";
import { useTheme } from "../../../ThemeContext";

interface LayoutGridItem {
  ui_properties: {
    background_color: string;
    text_color: string;
    column_start: number;
    column_end: number;
  };
  sections: string[];
}

interface Layout {
  name: string;
  image: string;
  grid: LayoutGridItem[];
  type: string;
}

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
  layout: Layout;
  setSelectedTemplate: (e) => void;
}

const ResumeRender: React.FC<ResumeRenderProps> = ({
  data,
  layout,
  setSelectedTemplate,
}) => {
  const [resumeData, setResumeData] = useState(data);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsDataChanged(JSON.stringify(resumeData) !== JSON.stringify(data));
  }, [resumeData, data]);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSubmit = (formData: any) => {
    setResumeData(formData);
    setIsEditMode(false);
  };

  const handleDownload = () => {
    // Selecting the container to convert to image
    const container: any = document.getElementById("resume-container");

    // Checking if the container exists
    if (container) {
      // Adjusting container styling to fit A4 size
      container.style.width = "794px"; // A4 width in pixels
      container.style.height = "1123px"; // A4 height in pixels
      container.style.overflow = "hidden"; // Hide overflow content

      // Selecting the inner content of the container
      const content = container.querySelector(".resume-content");

      // Checking if the content exists
      if (content) {
        // Scaling and positioning content to fit within A4 size
        const scale = Math.min(
          794 / content.offsetWidth,
          1123 / content.offsetHeight
        ); // Calculate scale
        content.style.transform = `scale(${scale})`; // Apply scale
        content.style.transformOrigin = "top left"; // Set transform origin
        content.style.position = "absolute"; // Position content
        content.style.top = "0"; // Align content to top
        content.style.left = "0"; // Align content to left
      }

      // Converting HTML to image with A4 dimensions
      htmlToImage
        .toPng(container, { width: 794, height: 1123 })
        .then(function (dataUrl) {
          // Creating a temporary anchor element to download the image
          const link = document.createElement("a");
          link.download = `${layout.name}.png`; // File name
          link.href = dataUrl;
          link.click();
        })
        .catch(function (error) {
          console.error("Error:", error);
        });

      container.style.width = "100%"; // A4 width in pixels
      container.style.maxHeight = `${isEditMode ? "100%" : "297mm"}`; // A4 height in pixels
      container.style.maxWidth = "100%"; // Hide overflow content
    }
  };

  function generateGridLayout(type: string) {
    switch (type) {
      case "1*2":
        return `35% 65%`;
      case "2*1":
        return `65% 35%`;
      default:
        return `100%`;
    }
  }

  return (
    <>
      {/* Buttons section */}
      <div className="flex justify-end p-2">
        <div className="flex space-x-2">
          {isDataChanged && !isEditMode && (
            <Button
              onClick={handleDownload}
              className="text-blue-500"
              variant="ghost"
            >
              <DownloadIcon />
            </Button>
          )}
          <Button
            onClick={() => {
              isEditMode ? setIsEditMode(false) : setSelectedTemplate(null);
            }}
            className="text-red-500"
            variant="ghost"
          >
            <Cross1Icon />
          </Button>
          <Button
            onClick={handleEdit}
            className="text-green-500"
            variant="ghost"
          >
            <Pencil1Icon />
          </Button>
        </div>
      </div>

      {/* Resume container */}
      <div
        id="resume-container"
        className={`relative bg-white shadow-lg rounded-lg overflow-hidden w-full`}
        style={{
          width: "100%",
          maxWidth: "210mm",
          maxHeight: `${isEditMode ? "100%" : "297mm"}`,
        }}
      >
        {/* Resume content */}
        {isEditMode ? (
          <ResumeForm
            initialData={resumeData}
            onSubmit={handleSubmit}
            layout={layout}
          />
        ) : (
          <div
            className={`grid`}
            style={{
              display: "grid",
              gridTemplateColumns: generateGridLayout(layout.type),
              height: "100%",
            }}
          >
            {layout.grid.map((grid, index) => (
              <div
                key={index}
                className="p-4"
                style={{
                  backgroundColor:
                    grid.ui_properties.background_color === "#f4f4f4"
                      ? theme["primary"]
                      : grid.ui_properties.background_color,
                  color:
                    grid.ui_properties.background_color === "#f4f4f4"
                      ? theme["text"]
                      : grid.ui_properties.text_color,
                }}
              >
                {grid.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-4">
                    {renderSection(section, resumeData)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

// Helper function to render section based on section name
const renderSection = (section: string, data: any) => {
  switch (section) {
    case "header":
      return (
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-xl">{data.designation}</p>
        </div>
      );
    case "contact":
      return (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <p className="flex items-start">
            <EnvelopeClosedIcon className="w-5 h-5 mt-1 mr-2 flex-shrink-0" />
            <span className="self-start break-words">{data.email}</span>
          </p>
          <p className="flex items-start">
            <PhoneIcon className="w-5 h-5 mt-1 mr-2 flex-shrink-0" />
            <span className="self-start break-words">{data.phone}</span>
          </p>
          <p className="flex items-start">
            <LinkedInLogoIcon className="w-5 h-5 mt-1 mr-2 flex-shrink-0" />
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-blue-500 underline break-words"
            >
              {data.linkedin}
            </a>
          </p>
          <p className="flex items-start">
            <GitHubLogoIcon className="w-5 h-5 mt-1 mr-2 flex-shrink-0" />
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-blue-500 underline break-words"
            >
              {data.github}
            </a>
          </p>
        </div>
      );
    case "summary":
      return (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Professional Summary</h2>
          <p>{data.summary}</p>
        </div>
      );
    case "skills":
      return (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <ul>
            {data.skills.split(",").map((skill, index) => (
              <li className="skillsListContainer" key={index}>
                <span>
                  <DotFilledIcon width={25} height={25} />
                </span>
                {skill.trim()}
              </li>
            ))}
          </ul>
        </div>
      );
    case "work_experience":
      return (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          {data.work_experience.map((experience, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-xl font-semibold">{experience.company}</h3>
              <p>{experience.position}</p>
              <p>{experience.duration}</p>
              <p>{experience.responsibilities}</p>
            </div>
          ))}
        </div>
      );
    case "projects":
      return (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-xl font-semibold">{project.project_name}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      );
    case "education":
      return (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Education</h2>
          {data.education.map((education, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-xl font-semibold">{education.institution}</h3>
              <p>{education.degree}</p>
              <p>{education.year}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default ResumeRender;
