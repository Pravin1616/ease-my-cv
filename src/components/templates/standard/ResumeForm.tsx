import React from 'react';
import { useForm, SubmitHandler, FormProvider, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType, ZodObject } from 'zod';

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
const createSchema = (sections: Section[]): ZodObject<any> => {
  const shape: Record<string, ZodType<any>> = {};

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      switch (field.type) {
        case 'text':
          shape[field.name] = z.string().min(1, `${field.label} is required`);
          break;
        case 'email':
          shape[field.name] = z.string().email('Invalid email address');
          break;
        case 'tel':
          shape[field.name] = z.string().min(10, 'Phone number should be at least 10 digits');
          break;
        case 'url':
          shape[field.name] = z.string().url('Invalid URL');
          break;
        case 'textarea':
          shape[field.name] = z.string().min(1, `${field.label} is required`);
          break;
        default:
          shape[field.name] = z.string();
      }
    });
  });

  return z.object(shape);
};

const schema = createSchema(typedTemplate.sections);

type FormData = z.infer<typeof schema>;

const ResumeForm: React.FC = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: typedTemplate.sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        acc[field.name] = field.default;
      });
      return acc;
    }, {} as Record<string, any>)
  });

  const { register, handleSubmit, formState: { errors } } = methods;

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
              {section.fields.map((field) => (
                <FormItem key={field.name}>
                  <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                  <FormControl>
                    {field.type === 'textarea' ? (
                      <Textarea id={field.name} {...register(field.name)} placeholder={field.default} />
                    ) : (
                      <Input id={field.name} {...register(field.name)} placeholder={field.default} />
                    )}
                  </FormControl>
                  <FormMessage>{(errors as FieldErrors<FormData> | any)[field.name]?.message}</FormMessage>
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
