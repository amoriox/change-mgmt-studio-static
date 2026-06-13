import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateWorkspaceModal } from "@/components/create-workspace-modal";
import { WorkspaceCard } from "@/components/workspace-card";
import { useDrafts, useWorkspaces } from "@/hooks/use-storage";

export function DashboardPage() {
  const { workspaces, ready, save } = useWorkspaces();
  const { drafts } = useDrafts();
  const [modalOpen, setModalOpen] = useState(false);

  const draftCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const d of drafts) {
      map[d.workspaceId] = (map[d.workspaceId] ?? 0) + 1;
    }
    return map;
  }, [drafts]);

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
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          New workspace
        </Button>
      </div>

      {!ready ? (
        <p className="mt-12 text-center text-slate-500">Loading...</p>
      ) : workspaces.length === 0 ? (
        <div className="mt-16 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">No workspaces yet.</p>
          <Button className="mt-4" onClick={() => setModalOpen(true)}>
            Create your first workspace
          </Button>
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
        onCreate={(ws) => save(ws)}
      />
    </div>
  );
}
