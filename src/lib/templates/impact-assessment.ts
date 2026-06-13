import type { TemplateDefinition } from "../types";

export const impactAssessment: TemplateDefinition = {
  id: "impact-assessment",
  name: "Change Impact Assessment",
  category: "assessment",
  description:
    "Document business process, technology, and people impacts by organizational layer.",
  estimatedMinutes: 45,
  fields: [
    { id: "scope", label: "Change scope summary", type: "textarea", required: true, rows: 4 },
    { id: "drivers", label: "Business drivers", type: "textarea", required: true, rows: 3 },
    {
      id: "severity",
      label: "Overall impact severity",
      type: "select",
      required: true,
      options: [
        { value: "low", label: "Low — localized adjustments" },
        { value: "medium", label: "Medium — multiple functions affected" },
        { value: "high", label: "High — enterprise-wide transformation" },
      ],
    },
    { id: "process", label: "Process impacts", type: "textarea", rows: 5 },
    { id: "technology", label: "Technology & systems impacts", type: "textarea", rows: 5 },
    { id: "roles", label: "Roles & responsibilities impacts", type: "textarea", rows: 5 },
    { id: "locations", label: "Locations & operating model", type: "textarea", rows: 4 },
    { id: "dependencies", label: "Critical dependencies & risks", type: "textarea", rows: 4 },
    { id: "mitigations", label: "Recommended mitigations", type: "textarea", rows: 4 },
  ],
  sections: [
    { title: "Executive Summary", fieldIds: ["scope", "drivers", "severity"] },
    { title: "Impact Analysis", fieldIds: ["process", "technology", "roles", "locations"] },
    { title: "Risk & Response", fieldIds: ["dependencies", "mitigations"] },
  ],
};
