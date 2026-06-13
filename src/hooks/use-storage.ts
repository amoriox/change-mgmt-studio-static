import { useCallback, useEffect, useState } from "react";
import type { Draft, Workspace } from "@/lib/types";
import * as storage from "@/lib/storage";

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setWorkspaces(storage.getWorkspaces());
    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    (workspace: Workspace) => {
      storage.upsertWorkspace(workspace);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      storage.deleteWorkspace(id);
      refresh();
    },
    [refresh]
  );

  return { workspaces, ready, save, remove, refresh };
}

export function useDrafts(workspaceId?: string) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    const all = storage.getDrafts();
    setDrafts(
      workspaceId ? all.filter((d) => d.workspaceId === workspaceId) : all
    );
    setReady(true);
  }, [workspaceId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    (draft: Draft) => {
      storage.upsertDraft(draft);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      storage.deleteDraft(id);
      refresh();
    },
    [refresh]
  );

  return { drafts, ready, save, remove, refresh };
}
