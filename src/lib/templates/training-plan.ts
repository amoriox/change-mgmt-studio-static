import type { TemplateDefinition } from "../types";

export const trainingPlan: TemplateDefinition = {
  id: "training-plan",
  name: "Training & Enablement Plan",
  category: "training",
  description:
    "Learning objectives, modalities, audience curriculum, and readiness criteria.",
  estimatedMinutes: 45,
  fields: [
    { id: "objectives", label: "Learning objectives", type: "textarea", required: true, rows: 4 },
    { id: "audiences", label: "Learner audiences & prerequisites", type: "textarea", rows: 4 },
    { id: "curriculum", label: "Curriculum outline", type: "textarea", required: true, rows: 6 },
    { id: "modalities", label: "Delivery modalities", type: "textarea", rows: 4 },
    { id: "schedule", label: "Training schedule & milestones", type: "textarea", rows: 5 },
    { id: "support", label: "Post-go-live support model", type: "textarea", rows: 4 },
    { id: "readiness", label: "Training readiness criteria", type: "textarea", rows: 3 },
  ],
  sections: [
    { title: "Learning Strategy", fieldIds: ["objectives", "audiences", "curriculum"] },
    { title: "Delivery", fieldIds: ["modalities", "schedule", "support"] },
    { title: "Readiness", fieldIds: ["readiness"] },
  ],
};
