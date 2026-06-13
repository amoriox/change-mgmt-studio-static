import type { TemplateDefinition } from "../types";

export const readinessChecklist: TemplateDefinition = {
  id: "readiness-checklist",
  name: "Go-Live Readiness Checklist",
  category: "readiness",
  description:
    "Cross-functional readiness criteria for cutover, hypercare, and rollback.",
  estimatedMinutes: 25,
  fields: [
    { id: "goLiveDate", label: "Target go-live date", type: "date", required: true },
    { id: "cutover", label: "Cutover criteria", type: "textarea", required: true, rows: 5 },
    { id: "people", label: "People readiness", type: "textarea", rows: 5 },
    { id: "process", label: "Process readiness", type: "textarea", rows: 5 },
    { id: "technology", label: "Technology readiness", type: "textarea", rows: 5 },
    { id: "hypercare", label: "Hypercare plan", type: "textarea", rows: 4 },
    { id: "rollback", label: "Rollback triggers & plan", type: "textarea", rows: 4 },
    { id: "signoff", label: "Sign-off requirements", type: "textarea", rows: 4 },
  ],
  sections: [
    { title: "Go-Live Overview", fieldIds: ["goLiveDate", "cutover"] },
    { title: "Readiness Domains", fieldIds: ["people", "process", "technology"] },
    { title: "Operations", fieldIds: ["hypercare", "rollback", "signoff"] },
  ],
};
