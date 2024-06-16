import React from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import template from "../../../json/form.json";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import { Input } from "../../../@/components/ui/input";
import { Button } from "../../../@/components/ui/button";
import { Textarea } from "../../../@/components/ui/textarea";

// Define types for the JSON template and layout
interface Field {
  name: string;
  label: string;
  type: string;
  default: string;
  maxLength?: number;
  maxLines?: number;
}

interface Section {
  id: string;
  type: string;
  title?: string;
  fields: Field[];
  data?: any[]; // To handle work_experience, projects, education data
}

interface Template {
  sections: Section[];
}

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
}

// Cast template to the correct type
const typedTemplate = template as Template;

// Function to dynamically create a Zod schema
const createSchema = (sections: Section[]) => {
  const shape: Record<string, any> = {};

  sections.forEach((section) => {
    if (
      section.id === "work_experience" ||
      section.id === "projects" ||
      section.id === "education"
    ) {
      shape[section.id] = z.array(
        z.object(
          section.fields.reduce((acc, field) => {
            acc[field.name] = z.string().min(1, `${field.label} is required`);
            return acc;
          }, {} as Record<string, any>)
        )
      );
    } else {
      section.fields.forEach((field) => {
        shape[field.name] = z.string().min(1, `${field.label} is required`);
      });
    }
  });

  return z.object(shape);
};

const schema = createSchema(typedTemplate.sections);

type FormData = z.infer<typeof schema>;

interface ResumeFormProps {
  initialData: FormData;
  onSubmit: (data: FormData) => void;
  layout: Layout;
}

// Function to filter sections based on the layout
const filterSectionsByLayout = (layout: Layout, sections: Section[]) => {
  const sectionIds = layout.grid.flatMap((gridItem) => gridItem.sections);
  return sections.filter((section) => sectionIds.includes(section.id));
};

const ResumeForm: React.FC<ResumeFormProps> = ({
  layout,
  initialData,
  onSubmit,
}) => {
  const filteredSections = filterSectionsByLayout(
    layout,
    typedTemplate.sections
  );

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const {
    fields: workExperienceFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    control,
    name: "work_experience",
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="grid gap-6 p-4">
        {filteredSections.map((section) => (
          <div key={section.id} className="space-y-2">
            {section.title && (
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {section.title}
              </h3>
            )}
            {section.id === "work_experience" && (
              <>
                {workExperienceFields.map((item, i) => (
                  <div key={item.id} className="space-y-0 flex items-start">
                    <div className="flex-1">
                      {section.fields.map((field) => (
                        <FormItem key={field.name}>
                          <FormLabel
                            htmlFor={`work_experience.${i}.${field.name}`}
                          >
                            {field.label}
                          </FormLabel>
                          <FormControl>
                            {field.type === "textarea" ? (
                              <Textarea
                                id={`work_experience.${i}.${field.name}`}
                                {...register(
                                  `work_experience.${i}.${field.name}` as const
                                )}
                                placeholder={field.default}
                              />
                            ) : (
                              <Input
                                id={`work_experience.${i}.${field.name}`}
                                {...register(
                                  `work_experience.${i}.${field.name}` as const
                                )}
                                placeholder={field.default}
                              />
                            )}
                          </FormControl>
                          <FormMessage>
                            {
                              errors?.work_experience?.[i]?.[field.name]
                                ?.message
                            }
                          </FormMessage>
                        </FormItem>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => removeWorkExperience(i)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
                {workExperienceFields.length < 2 && (
                  <Button
                    type="button"
                    onClick={() => appendWorkExperience({})}
                  >
                    Add Work Experience
                  </Button>
                )}
              </>
            )}
            {section.id === "projects" && (
              <>
                {projectFields.map((item, i) => (
                  <div key={item.id} className="space-y-0 flex items-start">
                    <div className="flex-1">
                      {section.fields.map((field) => (
                        <FormItem key={field.name}>
                          <FormLabel htmlFor={`projects.${i}.${field.name}`}>
                            {field.label}
                          </FormLabel>
                          <FormControl>
                            {field.type === "textarea" ? (
                              <Textarea
                                id={`projects.${i}.${field.name}`}
                                {...register(
                                  `projects.${i}.${field.name}` as const
                                )}
                                placeholder={field.default}
                              />
                            ) : (
                              <Input
                                id={`projects.${i}.${field.name}`}
                                {...register(
                                  `projects.${i}.${field.name}` as const
                                )}
                                placeholder={field.default}
                              />
                            )}
                          </FormControl>
                          <FormMessage>
                            {errors?.projects?.[i]?.[field.name]?.message}
                          </FormMessage>
                        </FormItem>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => removeProject(i)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
                {projectFields.length < 2 && (
                  <Button type="button" onClick={() => appendProject({})}>
                    Add Project
                  </Button>
                )}
              </>
            )}
            {section.id === "education" && (
              <>
                {educationFields.map((item, i) => (
                  <div key={item.id} className="space-y-0 flex items-start">
                    <div className="flex-1">
                      {section.fields.map((field) => (
                        <FormItem key={field.name}>
                          <FormLabel htmlFor={`education.${i}.${field.name}`}>
                            {field.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              id={`education.${i}.${field.name}`}
                              {...register(
                                `education.${i}.${field.name}` as const
                              )}
                              placeholder={field.default}
                            />
                          </FormControl>
                          <FormMessage>
                            {errors?.education?.[i]?.[field.name]?.message}
                          </FormMessage>
                        </FormItem>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => removeEducation(i)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
                {educationFields.length < 2 && (
                  <Button type="button" onClick={() => appendEducation({})}>
                    Add Education
                  </Button>
                )}
              </>
            )}
            {section.id !== "work_experience" &&
              section.id !== "projects" &&
              section.id !== "education" && (
                <>
                  {section.fields.map((field) => (
                    <FormItem key={field.name}>
                      <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                      <FormControl>
                        {field.type === "textarea" ? (
                          <Textarea
                            id={field.name}
                            {...register(field.name)}
                            placeholder={field.default}
                          />
                        ) : (
                          <Input
                            id={field.name}
                            {...register(field.name)}
                            placeholder={field.default}
                          />
                        )}
                      </FormControl>
                      <FormMessage>
                        {(errors as any)?.[field.name]?.message}
                      </FormMessage>
                    </FormItem>
                  ))}
                </>
              )}
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default ResumeForm;
