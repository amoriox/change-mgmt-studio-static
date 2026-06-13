"use client";

import { Input, Label, Select, Textarea } from "@/components/ui/input";
import type { FormField, TemplateDefinition } from "@/lib/types";

export function TemplateForm({
  template,
  values,
  onChange,
}: {
  template: TemplateDefinition;
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
}) {
  return (
    <div className="space-y-8">
      {template.sections.map((section) => (
        <section key={section.title}>
          <h3 className="font-display text-lg font-semibold text-navy-900">
            {section.title}
          </h3>
          <div className="mt-4 space-y-4">
            {section.fieldIds.map((fieldId) => {
              const field = template.fields.find((f) => f.id === fieldId);
              if (!field) return null;
              return (
                <FieldControl
                  key={field.id}
                  field={field}
                  value={values[field.id] ?? ""}
                  onChange={(v) => onChange(field.id, v)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `field-${field.id}`;

  return (
    <div>
      <Label htmlFor={id} required={field.required}>
        {field.label}
      </Label>
      {field.helpText && (
        <p className="mb-1.5 text-xs text-slate-500">{field.helpText}</p>
      )}
      {field.type === "textarea" && (
        <Textarea
          id={id}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.type === "text" && (
        <Input
          id={id}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.type === "date" && (
        <Input
          id={id}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.type === "select" && (
        <Select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select...</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
}
