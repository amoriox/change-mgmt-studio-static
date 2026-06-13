"use client";

import type { Workspace } from "@/lib/types";
import { renderDocument } from "@/lib/render";

export function DocumentPreview({
  templateId,
  values,
  workspace,
}: {
  templateId: string;
  values: Record<string, string>;
  workspace: Workspace;
}) {
  let markdown = "";
  try {
    markdown = renderDocument(templateId, values, workspace).markdown;
  } catch {
    return (
      <p className="text-sm text-slate-500">Select a template to preview.</p>
    );
  }

  const blocks = markdown.split("\n");

  return (
    <article className="prose-sm max-w-none text-slate-800">
      {blocks.map((line, i) => {
        if (line.startsWith("# "))
          return (
            <h1
              key={i}
              className="font-display text-xl font-bold"
              style={{ color: workspace.branding.primaryColor }}
            >
              {line.slice(2)}
            </h1>
          );
        if (line.startsWith("## "))
          return (
            <h2
              key={i}
              className="mt-6 border-l-4 pl-3 font-display text-base font-semibold"
              style={{
                borderColor: workspace.branding.accentColor,
                color: workspace.branding.primaryColor,
              }}
            >
              {line.slice(3)}
            </h2>
          );
        if (line.startsWith("### "))
          return (
            <h3 key={i} className="mt-4 text-sm font-semibold text-slate-700">
              {line.slice(4)}
            </h3>
          );
        if (line === "---")
          return <hr key={i} className="my-4 border-slate-200" />;
        if (line.startsWith("**") && line.includes(":**"))
          return (
            <p key={i} className="text-sm text-slate-600">
              {line.replace(/\*\*/g, "")}
            </p>
          );
        if (!line.trim()) return <div key={i} className="h-2" />;
        if (line === "_Not provided_")
          return (
            <p key={i} className="text-sm italic text-slate-400">
              Not provided
            </p>
          );
        return (
          <p key={i} className="text-sm leading-relaxed whitespace-pre-wrap">
            {line}
          </p>
        );
      })}
    </article>
  );
}
