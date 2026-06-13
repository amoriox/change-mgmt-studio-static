import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { TemplateDefinition } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

export function TemplateCard({
  template,
  workspaceId,
}: {
  template: TemplateDefinition;
  workspaceId: string;
}) {
  return (
    <Link
      to={`/workspaces/${workspaceId}/templates/${template.id}`}
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-navy-800/30 hover:shadow-sm"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-teal-600">
        {CATEGORY_LABELS[template.category]}
      </span>
      <h4 className="mt-2 font-display font-semibold text-navy-900">
        {template.name}
      </h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
        {template.description}
      </p>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
        <Clock className="h-3.5 w-3.5" />~{template.estimatedMinutes} min
      </p>
    </Link>
  );
}
