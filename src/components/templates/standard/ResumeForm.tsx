import React from 'react';
import { useForm, useFieldArray, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import template from '../../../json/template_1.json';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../../@/components/ui/form';
import { Input } from '../../../@/components/ui/input';
import { Button } from '../../../@/components/ui/button';
import { Textarea } from '../../../@/components/ui/textarea';

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

// Function to dynamically create a Zod schema
const createSchema = (sections: Section[]) => {
  const shape: Record<string, any> = {};

  sections.forEach((section) => {
    if (section.id === 'work_experience' || section.id === 'projects') {
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

const ResumeForm: React.FC = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: typedTemplate.sections.reduce((acc, section) => {
      if (section.id === 'work_experience' || section.id === 'projects') {
        acc[section.id] = [{}]; // initialize with an empty object for dynamic arrays
      } else {
        section.fields.forEach((field) => {
          acc[field.name] = field.default;
        });
      }
      return acc;
    }, {} as Record<string, any>)
  });

  const { register, handleSubmit, control, formState: { errors } } = methods;

  const { fields: workExperienceFields, append: appendWorkExperience } = useFieldArray({
    control,
    name: 'work_experience'
  });

  const { fields: projectFields, append: appendProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="p-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          {typedTemplate.sections.map((section) => (
            <div key={section.id} className="space-y-2">
              {section.title && <h3 className="text-2xl font-semibold leading-none tracking-tight">{section.title}</h3>}
              {section.id === 'work_experience' && (
                <>
                  {workExperienceFields.map((item, i) => (
                    <div key={item.id} className="space-y-2">
                      {section.fields.map((field) => (
                        <FormItem key={field.name}>
                          <FormLabel htmlFor={`work_experience.${i}.${field.name}`}>{field.label}</FormLabel>
                          <FormControl>
                            {field.type === 'textarea' ? (
                              <Textarea id={`work_experience.${i}.${field.name}`} {...register(`work_experience.${i}.${field.name}` as const)} placeholder={field.default} />
                            ) : (
                              <Input id={`work_experience.${i}.${field.name}`} {...register(`work_experience.${i}.${field.name}` as const)} placeholder={field.default} />
                            )}
                          </FormControl>
                          <FormMessage>{errors?.work_experience?.[i]?.[field.name]?.message}</FormMessage>
                        </FormItem>
                      ))}
                    </div>
                  ))}
                  <Button type="button" onClick={() => appendWorkExperience({})}>
                    Add More Work Experience
                  </Button>
                </>
              )}
              {section.id === 'projects' && (
                <>
                  {projectFields.map((item, i) => (
                    <div key={item.id} className="space-y-2">
                      {section.fields.map((field) => (
                        <FormItem key={field.name}>
                          <FormLabel htmlFor={`projects.${i}.${field.name}`}>{field.label}</FormLabel>
                          <FormControl>
                            {field.type === 'textarea' ? (
                              <Textarea id={`projects.${i}.${field.name}`} {...register(`projects.${i}.${field.name}` as const)} placeholder={field.default} />
                            ) : (
                              <Input id={`projects.${i}.${field.name}`} {...register(`projects.${i}.${field.name}` as const)} placeholder={field.default} />
                            )}
                          </FormControl>
                          <FormMessage>{errors?.projects?.[i]?.[field.name]?.message}</FormMessage>
                        </FormItem>
                      ))}
                    </div>
                  ))}
                  <Button type="button" onClick={() => appendProject({})}>
                    Add More Projects
                  </Button>
                </>
              )}
              {section.id !== 'work_experience' && section.id !== 'projects' &&
                section.fields.map((field) => (
                  <FormItem key={field.name}>
                    <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === 'textarea' ? (
                        <Textarea id={field.name} {...register(field.name)} placeholder={field.default} />
                      ) : (
                        <Input id={field.name} {...register(field.name)} placeholder={field.default} />
                      )}
                    </FormControl>
                    <FormMessage>{(errors as any)[field.name]?.message}</FormMessage>
                  </FormItem>
                ))}
            </div>
          ))}
          <Button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ResumeForm;
