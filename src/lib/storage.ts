import type { Draft, Workspace } from "./types";

const WORKSPACES_KEY = "cms_workspaces";
const DRAFTS_KEY = "cms_drafts";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    throw new Error("Unable to save data in browser storage.");
  }
}

export function getWorkspaces(): Workspace[] {
  return read<Workspace[]>(WORKSPACES_KEY, []);
}

export function saveWorkspaces(workspaces: Workspace[]): void {
  write(WORKSPACES_KEY, workspaces);
}

export function getWorkspace(id: string): Workspace | undefined {
  return getWorkspaces().find((w) => w.id === id);
}

export function upsertWorkspace(workspace: Workspace): void {
  const list = getWorkspaces();
  const idx = list.findIndex((w) => w.id === workspace.id);
  if (idx >= 0) list[idx] = workspace;
  else list.unshift(workspace);
  saveWorkspaces(list);
}

export function deleteWorkspace(id: string): void {
  saveWorkspaces(getWorkspaces().filter((w) => w.id !== id));
  saveDrafts(getDrafts().filter((d) => d.workspaceId !== id));
}

export function getDrafts(): Draft[] {
  return read<Draft[]>(DRAFTS_KEY, []);
}

export function saveDrafts(drafts: Draft[]): void {
  write(DRAFTS_KEY, drafts);
}

export function getDraft(id: string): Draft | undefined {
  return getDrafts().find((d) => d.id === id);
}

export function getDraftsForWorkspace(workspaceId: string): Draft[] {
  return getDrafts().filter((d) => d.workspaceId === workspaceId);
}

export function upsertDraft(draft: Draft): void {
  const list = getDrafts();
  const idx = list.findIndex((d) => d.id === draft.id);
  if (idx >= 0) list[idx] = draft;
  else list.unshift(draft);
  saveDrafts(list);
}

export function deleteDraft(id: string): void {
  saveDrafts(getDrafts().filter((d) => d.id !== id));
}

export function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
