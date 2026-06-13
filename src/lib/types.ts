export type TemplateCategory =
  | "assessment"
  | "stakeholders"
  | "communications"
  | "sponsorship"
  | "training"
  | "resistance"
  | "readiness"
  | "benefits";

export type FieldType = "text" | "textarea" | "select" | "date" | "list";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  estimatedMinutes: number;
  fields: FormField[];
  sections: { title: string; fieldIds: string[] }[];
}

export interface WorkspaceBranding {
  firmName: string;
  clientName: string;
  primaryColor: string;
  accentColor: string;
  logoUrl: string;
}

export interface Workspace {
  id: string;
  name: string;
  industry: string;
  programName: string;
  createdAt: string;
  updatedAt: string;
  branding: WorkspaceBranding;
}

export interface Draft {
  id: string;
  workspaceId: string;
  templateId: string;
  title: string;
  values: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  assessment: "Impact & Assessment",
  stakeholders: "Stakeholders",
  communications: "Communications",
  sponsorship: "Sponsorship",
  training: "Training & Enablement",
  resistance: "Resistance Management",
  readiness: "Readiness & Go-Live",
  benefits: "Benefits & Sustainment",
};
