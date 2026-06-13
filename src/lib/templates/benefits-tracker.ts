import type { TemplateDefinition } from "../types";

export const benefitsTracker: TemplateDefinition = {
  id: "benefits-tracker",
  name: "Benefits Realization Tracker",
  category: "benefits",
  description:
    "Define expected benefits, KPIs, owners, and sustainment checkpoints post go-live.",
  estimatedMinutes: 35,
  fields: [
    { id: "benefits", label: "Expected benefits", type: "textarea", required: true, rows: 5 },
    { id: "kpis", label: "KPIs & measurement approach", type: "textarea", required: true, rows: 5 },
    { id: "baseline", label: "Baseline & targets", type: "textarea", rows: 4 },
    { id: "owners", label: "Benefit owners", type: "textarea", rows: 4 },
    { id: "milestones", label: "Realization milestones", type: "textarea", rows: 5 },
    { id: "sustainment", label: "Sustainment & adoption plan", type: "textarea", rows: 4 },
  ],
  sections: [
    { title: "Benefits Definition", fieldIds: ["benefits", "kpis", "baseline"] },
    { title: "Accountability", fieldIds: ["owners", "milestones"] },
    { title: "Sustainment", fieldIds: ["sustainment"] },
  ],
};
