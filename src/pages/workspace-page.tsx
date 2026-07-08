import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { BrandingPanel } from "@/components/branding-panel";
import { TemplateCard } from "@/components/template-card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useDrafts, useWorkspaces } from "@/hooks/use-storage";
import { getWorkspace } from "@/lib/storage";
import { CATEGORIES_ORDER, TEMPLATES } from "@/lib/templates";
import {
  CATEGORY_LABELS,
  type Workspace,
  type WorkspaceBranding,
} from "@/lib/types";

export function WorkspacePage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { save, remove } = useWorkspaces();
  const { drafts, remove: removeDraft } = useDrafts(id);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  useEffect(() => {
    setWorkspace(getWorkspace(id) ?? null);
  }, [id]);

  const persist = useCallback(
    (next: Workspace) => {
      const updated = { ...next, updatedAt: new Date().toISOString() };
      setWorkspace(updated);
      save(updated);
    },
    [save]
  );

  if (!workspace) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-slate-600">Workspace not found.</p>
        <Link
          to="/dashboard"
          className="mt-4 inline-block text-teal-600 hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm("Delete this workspace and all its drafts?")) {
      remove(id);
      navigate("/dashboard");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-navy-900"
      >
        <ArrowLeft className="h-4 w-4" />
        All workspaces
      </Link>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-4">
          <div>
            <Label htmlFor="ws-title">Workspace name</Label>
            <Input
              id="ws-title"
              className="mt-1 max-w-lg text-lg font-semibold"
              value={workspace.name}
              onChange={(e) => persist({ ...workspace, name: e.target.value })}
            />
          </div>
          <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Financial services"
                value={workspace.industry}
                onChange={(e) =>
                  persist({ ...workspace, industry: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="program">Program name</Label>
              <Input
                id="program"
                value={workspace.programName}
                onChange={(e) =>
                  persist({ ...workspace, programName: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>

      <div className="mt-8">
        <BrandingPanel
          workspace={workspace}
          onChange={(branding: WorkspaceBranding) =>
            persist({ ...workspace, branding })
          }
        />
      </div>

      {drafts.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-navy-900">
            Saved drafts
          </h2>
          <ul className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {drafts.map((draft) => (
              <li
                key={draft.id}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{draft.title}</p>
                  <p className="text-xs text-slate-500">
                    Updated {new Date(draft.updatedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    to={`/workspaces/${id}/templates/${draft.templateId}?draft=${draft.id}`}
                    variant="secondary"
                    size="sm"
                  >
                    Continue
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDraft(draft.id)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold text-navy-900">
          Template library
        </h2>
        {CATEGORIES_ORDER.map((cat) => {
          const items = TEMPLATES.filter((t) => t.category === cat);
          return (
            <div key={cat} className="mt-6">
              <h3 className="text-sm font-medium uppercase tracking-wide text-teal-600">
                {CATEGORY_LABELS[cat]}
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((t) => (
                  <TemplateCard key={t.id} template={t} workspaceId={id} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
