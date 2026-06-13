import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Download,
  FileStack,
  Palette,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Briefcase,
    title: "Client workspaces",
    description:
      "Organize each engagement with program context, industry notes, and firm branding.",
  },
  {
    icon: FileStack,
    title: "Consulting template library",
    description:
      "Eight proven deliverables—from impact assessment through benefits tracking.",
  },
  {
    icon: Palette,
    title: "Branded exports",
    description:
      "Primary and accent colors flow into HTML deliverables ready for client review.",
  },
  {
    icon: Save,
    title: "Saved drafts",
    description:
      "Pick up where you left off. Drafts persist locally in your browser.",
  },
  {
    icon: Download,
    title: "Markdown & HTML export",
    description:
      "Download polished documents for decks, portals, or further editing.",
  },
];

const templates = [
  "Change Impact Assessment",
  "Stakeholder Engagement Plan",
  "Communications Plan",
  "Executive Sponsor Roadmap",
  "Training & Enablement Plan",
  "Resistance Management Playbook",
  "Go-Live Readiness Checklist",
  "Benefits Realization Tracker",
];

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1e3a5f_0%,_transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-400">
            Change management consulting
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Generate client-ready templates in minutes, not days
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Change Mgmt Studio helps consultants produce consistent, branded
            deliverables across the full change lifecycle—from discovery through
            sustainment.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/dashboard">
              <Button className="bg-teal-600 hover:bg-teal-500">
                Open dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="secondary"
                className="border-slate-600 bg-transparent text-white hover:bg-white/10"
              >
                Create a workspace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-navy-900">
          Built for consulting workflows
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <f.icon className="h-8 w-8 text-teal-600" />
              <h3 className="mt-4 font-display font-semibold text-navy-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900">
                Template library
              </h2>
              <p className="mt-2 max-w-md text-slate-600">
                Structured sections and field guidance aligned to Prosci, ADKAR,
                and enterprise program governance.
              </p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 lg:max-w-xl">
              {templates.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
