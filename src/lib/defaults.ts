import type { Workspace, WorkspaceBranding } from "./types";
import { createId } from "./storage";

export const DEFAULT_BRANDING: WorkspaceBranding = {
  firmName: "Your Consulting Firm",
  clientName: "Client Organization",
  primaryColor: "#1e3a5f",
  accentColor: "#0d9488",
  logoUrl: "",
};

export function createWorkspace(
  partial?: Partial<Omit<Workspace, "branding">> & {
    branding?: Partial<WorkspaceBranding>;
  }
): Workspace {
  const now = new Date().toISOString();
  const { branding, ...rest } = partial ?? {};

  return {
    id: createId(),
    name: "New Client Engagement",
    industry: "",
    programName: "Enterprise Transformation",
    createdAt: now,
    updatedAt: now,
    branding: { ...DEFAULT_BRANDING, ...branding },
    ...rest,
  };
}
