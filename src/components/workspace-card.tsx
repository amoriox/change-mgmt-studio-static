import { Link } from "react-router-dom";
import { Building2, ChevronRight, FileText } from "lucide-react";
import type { Workspace } from "@/lib/types";

export function WorkspaceCard({
  workspace,
  draftCount,
}: {
  workspace: Workspace;
  draftCount: number;
}) {
  return (
    <Link
      to={`/workspaces/${workspace.id}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-teal-600/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
          style={{ backgroundColor: workspace.branding.primaryColor }}
        >
          <Building2 className="h-5 w-5" />
        </div>
        <ChevronRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-600" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
        {workspace.name}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {workspace.branding.clientName} · {workspace.programName}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <FileText className="h-3.5 w-3.5" />
        {draftCount} saved draft{draftCount === 1 ? "" : "s"}
      </div>
    </Link>
  );
}
