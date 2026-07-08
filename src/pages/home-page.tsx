import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <Button to="/dashboard" className="bg-teal-600 hover:bg-teal-500">
              Open dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              to="/dashboard?create=1"
              variant="ghost"
              className="text-slate-300 hover:bg-transparent hover:text-white"
            >
              Create a workspace
            </Button>
          </div>
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
