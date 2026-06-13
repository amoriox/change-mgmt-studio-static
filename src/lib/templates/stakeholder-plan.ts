import type { TemplateDefinition } from "../types";

export const stakeholderPlan: TemplateDefinition = {
  id: "stakeholder-plan",
  name: "Stakeholder Analysis & Engagement Plan",
  category: "stakeholders",
  description:
    "Map influence and interest, define engagement tactics, and sequence outreach.",
  estimatedMinutes: 40,
  fields: [
    { id: "segments", label: "Stakeholder segments", type: "textarea", required: true, rows: 4, placeholder: "e.g. Executive sponsors, middle managers, frontline teams..." },
    { id: "influence", label: "Influence / interest matrix notes", type: "textarea", rows: 5 },
    { id: "champions", label: "Change champions & advocates", type: "textarea", rows: 4 },
    { id: "concerns", label: "Known concerns & objections", type: "textarea", rows: 4 },
    { id: "tactics", label: "Engagement tactics by segment", type: "textarea", required: true, rows: 6 },
    { id: "cadence", label: "Engagement cadence & forums", type: "textarea", rows: 4 },
    { id: "metrics", label: "Success metrics for engagement", type: "textarea", rows: 3 },
  ],
  sections: [
    { title: "Stakeholder Landscape", fieldIds: ["segments", "influence", "champions"] },
    { title: "Engagement Strategy", fieldIds: ["concerns", "tactics", "cadence"] },
    { title: "Measurement", fieldIds: ["metrics"] },
  ],
};
