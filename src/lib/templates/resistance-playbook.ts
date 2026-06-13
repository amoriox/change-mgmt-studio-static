import type { TemplateDefinition } from "../types";

export const resistancePlaybook: TemplateDefinition = {
  id: "resistance-playbook",
  name: "Resistance Management Playbook",
  category: "resistance",
  description:
    "Anticipate resistance themes, root causes, and structured response protocols.",
  estimatedMinutes: 30,
  fields: [
    { id: "themes", label: "Anticipated resistance themes", type: "textarea", required: true, rows: 5 },
    { id: "rootCauses", label: "Root cause analysis", type: "textarea", rows: 5 },
    { id: "earlySignals", label: "Early warning signals", type: "textarea", rows: 4 },
    { id: "responses", label: "Response protocols by theme", type: "textarea", required: true, rows: 6 },
    { id: "owners", label: "Owners & escalation", type: "textarea", rows: 4 },
    { id: "tracking", label: "Tracking & reporting", type: "textarea", rows: 3 },
  ],
  sections: [
    { title: "Resistance Landscape", fieldIds: ["themes", "rootCauses", "earlySignals"] },
    { title: "Response Playbook", fieldIds: ["responses", "owners", "tracking"] },
  ],
};
