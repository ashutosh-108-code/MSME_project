"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Eye,
  Mail,
  Database,
  Video,
  Store,
  Factory,
  Rocket,
  Warehouse,
  CheckCircle2,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { useAuth } from "../../lib/AuthContext";
import { typography } from "../../styles/tokens";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const NAV_ITEMS = ["Features", "Resources", "About us"];

const FEATURES = [
  { icon: Eye, title: "Real-time monitoring", desc: "Identity, email, leaks, and deepfake — all in one place." },
  { icon: Mail, title: "Plain-language alerts", desc: "No jargon. Just what happened and what to do next." },
  { icon: ShieldCheck, title: "One-tap panic button", desc: "Something wrong? Press the button. We handle the rest." },
];

const BUSINESS_TYPES = [
  { icon: Store, label: "Small Shops" },
  { icon: Factory, label: "Factories" },
  { icon: Rocket, label: "Startups" },
  { icon: Warehouse, label: "Warehouses" },
];

export default function WelcomePage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/onboarding/email-optin");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen bg-white">
      <div
        className="pointer-events-none fixed inset-0 bg-cover bg-center opacity-[0.08]"
        style={{ backgroundImage: "url('/bg/page-bg.png')" }}
      />

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-neutral-100)] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-6 text-[var(--color-safe-green-600)]" />
            <span className="text-sm font-bold text-[var(--color-neutral-900)]">Sentinel Shield</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <button key={item} className="text-sm text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-900)]">
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outline" size="sm" onClick={() => router.push("/login")}>Sign in</Button>
            <Button variant="primary" size="sm" onClick={() => router.push("/signup")}>Create your account</Button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[var(--color-neutral-100)] bg-white px-4 pb-6 pt-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <button key={item} className="text-sm text-[var(--color-neutral-500)]">{item}</button>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3">
              <Button variant="outline" onClick={() => router.push("/login")}>Sign in</Button>
              <Button variant="primary" onClick={() => router.push("/signup")}>Create your account</Button>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-safe-green-50)] via-white to-[var(--color-safe-green-50)]" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/bg/hero-bg.png')" }}
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-[var(--color-neutral-900)] sm:text-5xl">
                Secure today,<br />empower tomorrow.
              </h1>
              <p className={`${typography.body} mt-4 max-w-lg text-base`}>
                Sentinel Shield protects Indian businesses from identity theft, email scams, data leaks, and deepfake impersonation — all in one plain-language dashboard.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="primary" onClick={() => router.push("/signup")}>
                  Create your account <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => router.push("/login")}>Sign in</Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-sm rounded-2xl border-[var(--color-safe-green-100)] bg-white/95 p-6 shadow-lg shadow-[var(--color-safe-green-100)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-[var(--color-safe-green-500)]" />
                  <span className="text-sm font-semibold text-[var(--color-neutral-900)]">All systems secured</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { icon: Eye, label: "Identity Monitoring" },
                    { icon: Mail, label: "Email Protection" },
                    { icon: Database, label: "Data Leak Watch" },
                    { icon: Video, label: "Deepfake Detection" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center justify-between rounded-lg bg-[var(--color-safe-green-50)] px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-[var(--color-safe-green-600)]" />
                        <span className="text-xs font-medium text-[var(--color-neutral-700)]">{label}</span>
                      </div>
                      <Badge variant="safe">Active</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-t border-[var(--color-neutral-100)] bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--color-neutral-200)] bg-white p-6 shadow-[var(--shadow-soft)]">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-safe-green-50)]">
                  <Icon className="size-5 text-[var(--color-safe-green-600)]" />
                </div>
                <p className="mt-4 text-sm font-semibold text-[var(--color-neutral-900)]">{title}</p>
                <p className={`${typography.body} mt-1`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Types ── */}
      <section className="border-t border-[var(--color-neutral-100)] bg-[var(--color-neutral-50)] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-[var(--color-neutral-500)]">
            Securing businesses like yours
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {BUSINESS_TYPES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="flex size-14 items-center justify-center rounded-xl border border-[var(--color-neutral-200)] bg-white">
                  <Icon className="size-6 text-[var(--color-neutral-500)]" />
                </div>
                <span className="text-xs font-medium text-[var(--color-neutral-500)]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--color-neutral-100)] bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className={`${typography.body}`}>Building a digitally secure India, together.</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-[#FF9933]" />
            <span className="inline-block h-3 w-3 rounded-full border border-[var(--color-neutral-200)] bg-white" />
            <span className="inline-block h-3 w-3 rounded-full bg-[#138808]" />
            <span className="ml-1 text-xs font-medium text-[var(--color-neutral-500)]">Proudly made in India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
