import type { TemplateCategory, TemplateDefinition } from "../types";
import { benefitsTracker } from "./benefits-tracker";
import { communicationsPlan } from "./communications-plan";
import { impactAssessment } from "./impact-assessment";
import { readinessChecklist } from "./readiness-checklist";
import { resistancePlaybook } from "./resistance-playbook";
import { sponsorRoadmap } from "./sponsor-roadmap";
import { stakeholderPlan } from "./stakeholder-plan";
import { trainingPlan } from "./training-plan";

export const TEMPLATES: TemplateDefinition[] = [
  impactAssessment,
  stakeholderPlan,
  communicationsPlan,
  sponsorRoadmap,
  trainingPlan,
  resistancePlaybook,
  readinessChecklist,
  benefitsTracker,
];

export function getTemplate(id: string): TemplateDefinition | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByCategory(
  category: TemplateCategory
): TemplateDefinition[] {
  return TEMPLATES.filter((t) => t.category === category);
}

export const CATEGORIES_ORDER: TemplateCategory[] = [
  "assessment",
  "stakeholders",
  "communications",
  "sponsorship",
  "training",
  "resistance",
  "readiness",
  "benefits",
];
