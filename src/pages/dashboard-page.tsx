import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { CreateWorkspaceModal } from "@/components/create-workspace-modal";
import { WorkspaceCard } from "@/components/workspace-card";
import { useDrafts, useWorkspaces } from "@/hooks/use-storage";
import type { Workspace } from "@/lib/types";

export function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { workspaces, ready, save } = useWorkspaces();
  const { drafts } = useDrafts();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("create") === "1") {
      setModalOpen(true);
      const next = new URLSearchParams(searchParams);
      next.delete("create");
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const draftCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const d of drafts) {
      map[d.workspaceId] = (map[d.workspaceId] ?? 0) + 1;
    }
    return map;
  }, [drafts]);

  const handleCreate = (workspace: Workspace) => {
    save(workspace);
    setModalOpen(false);
    navigate(`/workspaces/${workspace.id}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">
            Client workspaces
          </h1>
          <p className="mt-1 text-slate-600">
            Manage engagements, branding, templates, and saved drafts.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-navy-700"
        >
          <Plus className="h-4 w-4" />
          New workspace
        </button>
      </div>

      {!ready ? (
        <p className="mt-12 text-center text-slate-500">Loading...</p>
      ) : workspaces.length === 0 ? (
        <div className="mt-16 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">No workspaces yet.</p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white hover:bg-navy-700"
          >
            Create your first workspace
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((ws) => (
            <WorkspaceCard
              key={ws.id}
              workspace={ws}
              draftCount={draftCounts[ws.id] ?? 0}
            />
          ))}
        </div>
      )}

      <CreateWorkspaceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
