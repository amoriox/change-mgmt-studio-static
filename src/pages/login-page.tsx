import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layers, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { login } from "@/lib/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from =
    (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!import.meta.env.VITE_SITE_PASSWORD) {
      setError("Site password is not configured.");
      return;
    }

    if (!login(password)) {
      setError("Incorrect password.");
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-white">
            <Layers className="h-6 w-6" />
          </div>
          <p className="mt-6 text-sm font-medium uppercase tracking-widest text-teal-600">
            Amori Solutions
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-navy-900">
            Change Mgmt Studio
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter the site password to continue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <Label htmlFor="password" required>
              Password
            </Label>
            <div className="relative mt-1.5">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                className="pl-9"
                placeholder="Site password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="mt-5 w-full">
            Continue
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          amorisolutions.xyz · Static edition
        </p>
      </div>
    </div>
  );
}
