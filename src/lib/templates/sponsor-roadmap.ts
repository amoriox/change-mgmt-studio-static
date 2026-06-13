import type { TemplateDefinition } from "../types";

export const sponsorRoadmap: TemplateDefinition = {
  id: "sponsor-roadmap",
  name: "Executive Sponsor Roadmap",
  category: "sponsorship",
  description:
    "Define sponsor accountabilities, visible leadership actions, and talking points.",
  estimatedMinutes: 35,
  fields: [
    { id: "sponsors", label: "Sponsor roster & roles", type: "textarea", required: true, rows: 4 },
    { id: "accountabilities", label: "Sponsor accountabilities (ADKAR-aligned)", type: "textarea", rows: 5 },
    { id: "actions", label: "Visible leadership actions", type: "textarea", required: true, rows: 6 },
    { id: "talkingPoints", label: "Executive talking points", type: "textarea", rows: 6 },
    { id: "forums", label: "Sponsor forums & cadence", type: "textarea", rows: 4 },
    { id: "escalation", label: "Escalation path & decision rights", type: "textarea", rows: 4 },
  ],
  sections: [
    { title: "Sponsorship Model", fieldIds: ["sponsors", "accountabilities"] },
    { title: "Leadership Activation", fieldIds: ["actions", "talkingPoints", "forums"] },
    { title: "Governance", fieldIds: ["escalation"] },
  ],
};
