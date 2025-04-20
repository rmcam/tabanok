import React from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface FormField {
  name: string;
  label: string;
  type: string;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

interface FormConfig {
  title: string;
  fields: FormField[];
}

interface DynamicFormProps {
  config: FormConfig;
  onSubmit: (data: { [key: string]: string }) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, onSubmit }) => {
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data: { [key: string]: string } = {};
    config.fields.forEach((field) => {
      const input = form.elements.namedItem(field.name) as HTMLInputElement;
      data[field.name] = input.value;
    });
    onSubmit(data);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold">{config.title}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        {config.fields.map((field) => (
          <div key={field.name} className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              type={field.type}
              id={field.name}
              placeholder={field.label}
              aria-label={field.label}
              {...(field.validation.required ? { required: true } : {})}
            />
          </div>
        ))}
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
};

export default DynamicForm;
