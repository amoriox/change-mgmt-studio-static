import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Download, FileCode, Save } from "lucide-react";
import { DocumentPreview } from "@/components/document-preview";
import { TemplateForm } from "@/components/template-form";
import { Button } from "@/components/ui/button";
import { useDrafts } from "@/hooks/use-storage";
import { downloadFile, renderDocument } from "@/lib/export";
import { createId, getDraft, getWorkspace } from "@/lib/storage";
import { getTemplate } from "@/lib/templates";
import type { Draft, Workspace } from "@/lib/types";

export function TemplatePage() {
  const { id: workspaceId = "", templateId = "" } = useParams();
  const [searchParams] = useSearchParams();
  const draftParam = searchParams.get("draft");

  const template = getTemplate(templateId);
  const { save: saveDraft } = useDrafts(workspaceId);

  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [draftId, setDraftId] = useState<string | null>(null);
  const [savedHint, setSavedHint] = useState(false);
  const [tab, setTab] = useState<"form" | "preview">("form");

  useEffect(() => {
    setWorkspace(getWorkspace(workspaceId) ?? null);
  }, [workspaceId]);

  useEffect(() => {
    if (!template) return;
    if (draftParam) {
      const draft = getDraft(draftParam);
      if (draft && draft.templateId === templateId) {
        setValues(draft.values);
        setDraftId(draft.id);
        return;
      }
    }
    const initial: Record<string, string> = {};
    for (const f of template.fields) initial[f.id] = "";
    setValues(initial);
    setDraftId(null);
  }, [template, templateId, draftParam]);

  const setValue = useCallback((fieldId: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setSavedHint(false);
  }, []);

  const handleSaveDraft = useCallback(() => {
    if (!workspace || !template) return;
    const newId = draftId ?? createId();
    const now = new Date().toISOString();
    const draft: Draft = {
      id: newId,
      workspaceId,
      templateId,
      title: `${template.name} — ${workspace.branding.clientName}`,
      values,
      createdAt: draftId ? (getDraft(draftId)?.createdAt ?? now) : now,
      updatedAt: now,
    };
    saveDraft(draft);
    setDraftId(newId);
    setSavedHint(true);
    setTimeout(() => setSavedHint(false), 2000);
  }, [workspace, template, draftId, workspaceId, templateId, values, saveDraft]);

  const slug = useMemo(() => {
    if (!template) return "document";
    return template.name.toLowerCase().replace(/\s+/g, "-");
  }, [template]);

  const handleExportMd = () => {
    if (!workspace || !template) return;
    const { markdown } = renderDocument(templateId, values, workspace);
    downloadFile(`${slug}.md`, markdown, "text/markdown");
  };

  const handleExportHtml = () => {
    if (!workspace || !template) return;
    const { html } = renderDocument(templateId, values, workspace);
    downloadFile(`${slug}.html`, html, "text/html");
  };

  if (!template || !workspace) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-slate-600">
        Template or workspace not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <Link
        to={`/workspaces/${workspaceId}`}
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-navy-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {workspace.name}
      </Link>

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">
            {template.name}
          </h1>
          <p className="mt-1 text-slate-600">{template.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={handleSaveDraft}>
            <Save className="h-4 w-4" />
            {savedHint ? "Saved" : "Save draft"}
          </Button>
          <Button variant="secondary" size="sm" onClick={handleExportMd}>
            <Download className="h-4 w-4" />
            Markdown
          </Button>
          <Button size="sm" onClick={handleExportHtml}>
            <FileCode className="h-4 w-4" />
            HTML
          </Button>
        </div>
      </div>

      <div className="mt-6 flex gap-2 border-b border-slate-200 lg:hidden">
        <button
          type="button"
          onClick={() => setTab("form")}
          className={`border-b-2 px-3 py-2 text-sm font-medium ${
            tab === "form"
              ? "border-teal-600 text-teal-600"
              : "border-transparent text-slate-500"
          }`}
        >
          Form
        </button>
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={`border-b-2 px-3 py-2 text-sm font-medium ${
            tab === "preview"
              ? "border-teal-600 text-teal-600"
              : "border-transparent text-slate-500"
          }`}
        >
          Preview
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div
          className={`rounded-xl border border-slate-200 bg-white p-6 ${
            tab === "preview" ? "hidden lg:block" : ""
          }`}
        >
          <TemplateForm
            template={template}
            values={values}
            onChange={setValue}
          />
        </div>
        <div
          className={`sticky top-20 rounded-xl border border-slate-200 bg-white p-6 ${
            tab === "form" ? "hidden lg:block" : ""
          }`}
        >
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-500">
            Live preview
          </h2>
          <div className="mt-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <DocumentPreview
              templateId={templateId}
              values={values}
              workspace={workspace}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
