import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { createWorkspace } from "@/lib/defaults";
import type { Workspace } from "@/lib/types";

export function CreateWorkspaceModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (workspace: Workspace) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [program, setProgram] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setError("");
    setName("");
    setClient("");
    setProgram("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const workspace = createWorkspace({
        name: name.trim() || "New Client Engagement",
        programName: program.trim() || "Enterprise Transformation",
        branding: {
          clientName: client.trim() || "Client Organization",
        },
      });
      onCreate(workspace);
    } catch {
      setError("Could not save workspace. Check that browser storage is enabled.");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-workspace-title"
      >
        <div className="flex items-center justify-between">
          <h2
            id="create-workspace-title"
            className="font-display text-lg font-semibold text-navy-900"
          >
            New client workspace
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <Label htmlFor="ws-name">Workspace name</Label>
            <Input
              id="ws-name"
              placeholder="e.g. Acme Corp — ERP Rollout"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="ws-client">Client organization</Label>
            <Input
              id="ws-client"
              placeholder="Acme Corporation"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ws-program">Program name</Label>
            <Input
              id="ws-program"
              placeholder="Global ERP Transformation"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create workspace</Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
