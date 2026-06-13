import type { TemplateDefinition } from "../types";

export const communicationsPlan: TemplateDefinition = {
  id: "communications-plan",
  name: "Change Communications Plan",
  category: "communications",
  description:
    "Audience-specific messaging, channels, timing, and feedback loops for the program.",
  estimatedMinutes: 50,
  fields: [
    { id: "narrative", label: "Core change narrative", type: "textarea", required: true, rows: 4 },
    { id: "audiences", label: "Audience groups", type: "textarea", required: true, rows: 4 },
    { id: "keyMessages", label: "Key messages by audience", type: "textarea", required: true, rows: 6 },
    { id: "channels", label: "Channels & touchpoints", type: "textarea", rows: 5 },
    { id: "timeline", label: "Communications timeline", type: "textarea", rows: 5 },
    { id: "cascade", label: "Manager cascade approach", type: "textarea", rows: 4 },
    { id: "feedback", label: "Feedback & listening mechanisms", type: "textarea", rows: 4 },
    { id: "crisis", label: "Issues & crisis communications", type: "textarea", rows: 3 },
  ],
  sections: [
    { title: "Messaging Foundation", fieldIds: ["narrative", "audiences", "keyMessages"] },
    { title: "Delivery Plan", fieldIds: ["channels", "timeline", "cascade"] },
    { title: "Governance", fieldIds: ["feedback", "crisis"] },
  ],
};
