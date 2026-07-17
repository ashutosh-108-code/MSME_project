"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useAuth } from "../../lib/AuthContext";
import { typography } from "../../styles/tokens";

type Mode = "login" | "signup";

export function AuthForm({ initialMode = "login" }: { initialMode?: Mode }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(name, email, businessName, password);
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "signup" : "login"));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--color-safe-green-50)] px-4 py-1.5 text-xs font-semibold text-[var(--color-safe-green-700)]">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Sentinel Shield
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-[var(--color-neutral-900)]">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className={`${typography.body} mt-2`}>
          {mode === "login"
            ? "Sign in to your business security dashboard."
            : "Set up your business in under a minute."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--color-neutral-700)]"
            >
              Your name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-[var(--color-neutral-300)] bg-white px-3 py-2 text-sm text-[var(--color-neutral-900)] placeholder:text-[var(--color-neutral-500)] focus:border-[var(--color-neutral-900)] focus:outline-none focus:ring-1 focus:ring-[var(--color-neutral-900)]"
              placeholder="Rajesh Kumar"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--color-neutral-700)]"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-[var(--color-neutral-300)] bg-white px-3 py-2 text-sm text-[var(--color-neutral-900)] placeholder:text-[var(--color-neutral-500)] focus:border-[var(--color-neutral-900)] focus:outline-none focus:ring-1 focus:ring-[var(--color-neutral-900)]"
            placeholder="rajesh@mybusiness.com"
          />
        </div>

        {mode === "signup" && (
          <div>
            <label
              htmlFor="business"
              className="block text-sm font-medium text-[var(--color-neutral-700)]"
            >
              Business name
            </label>
            <input
              id="business"
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-[var(--color-neutral-300)] bg-white px-3 py-2 text-sm text-[var(--color-neutral-900)] placeholder:text-[var(--color-neutral-500)] focus:border-[var(--color-neutral-900)] focus:outline-none focus:ring-1 focus:ring-[var(--color-neutral-900)]"
              placeholder="Shree Ganesh Traders"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[var(--color-neutral-700)]"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border border-[var(--color-neutral-300)] bg-white px-3 py-2 pr-10 text-sm text-[var(--color-neutral-900)] placeholder:text-[var(--color-neutral-500)] focus:border-[var(--color-neutral-900)] focus:outline-none focus:ring-1 focus:ring-[var(--color-neutral-900)]"
              placeholder="At least 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-700)]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {mode === "login" ? "Sign in" : "Create account"}
        </Button>
      </form>

      <p className={`${typography.body} mt-6 text-center`}>
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-[var(--color-neutral-900)] underline underline-offset-2 hover:text-[var(--color-neutral-700)]"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-[var(--color-neutral-900)] underline underline-offset-2 hover:text-[var(--color-neutral-700)]"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
