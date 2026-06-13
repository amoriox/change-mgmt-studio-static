"use client";

import { Input, Label } from "@/components/ui/input";
import type { Workspace, WorkspaceBranding } from "@/lib/types";

export function BrandingPanel({
  workspace,
  onChange,
}: {
  workspace: Workspace;
  onChange: (branding: WorkspaceBranding) => void;
}) {
  const b = workspace.branding;

  const update = (patch: Partial<WorkspaceBranding>) => {
    onChange({ ...b, ...patch });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-500">
        Workspace branding
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Applied to exports and document headers for this client.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="firmName">Consulting firm</Label>
          <Input
            id="firmName"
            value={b.firmName}
            onChange={(e) => update({ firmName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="clientName">Client name</Label>
          <Input
            id="clientName"
            value={b.clientName}
            onChange={(e) => update({ clientName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="primaryColor">Primary color</Label>
          <div className="flex gap-2">
            <input
              type="color"
              id="primaryColor"
              value={b.primaryColor}
              onChange={(e) => update({ primaryColor: e.target.value })}
              className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200"
            />
            <Input
              value={b.primaryColor}
              onChange={(e) => update({ primaryColor: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="accentColor">Accent color</Label>
          <div className="flex gap-2">
            <input
              type="color"
              id="accentColor"
              value={b.accentColor}
              onChange={(e) => update({ accentColor: e.target.value })}
              className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200"
            />
            <Input
              value={b.accentColor}
              onChange={(e) => update({ accentColor: e.target.value })}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="logoUrl">Logo URL (optional)</Label>
          <Input
            id="logoUrl"
            placeholder="https://..."
            value={b.logoUrl}
            onChange={(e) => update({ logoUrl: e.target.value })}
          />
        </div>
      </div>
      <div
        className="mt-4 rounded-lg border border-slate-100 p-4"
        style={{ borderLeftColor: b.primaryColor, borderLeftWidth: 4 }}
      >
        <p className="text-xs uppercase tracking-wide" style={{ color: b.primaryColor }}>
          {b.firmName}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          {b.clientName} · Preview
        </p>
      </div>
    </div>
  );
}
