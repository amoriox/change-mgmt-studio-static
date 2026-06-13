"use client";

import { useState } from "react";
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
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [program, setProgram] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workspace = createWorkspace({
      name: name || "New Client Engagement",
      programName: program || "Enterprise Transformation",
      branding: {
        firmName: "Your Consulting Firm",
        clientName: client || "Client Organization",
        primaryColor: "#1e3a5f",
        accentColor: "#0d9488",
        logoUrl: "",
      },
    });
    onCreate(workspace);
    setName("");
    setClient("");
    setProgram("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/40"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-navy-900">
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
            <Label htmlFor="ws-name" required>
              Workspace name
            </Label>
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
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create workspace</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
