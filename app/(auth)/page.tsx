"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "../../components/ui/button";
import { useAuth } from "../../lib/AuthContext";
import { typography } from "../../styles/tokens";

export default function WelcomePage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/onboarding/email-optin");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-safe-green-50)] px-4 py-1.5 text-xs font-semibold text-[var(--color-safe-green-700)]">
        <ShieldCheck className="size-3.5" aria-hidden="true" />
        Sentinel Shield
      </div>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-[var(--color-neutral-900)] sm:text-4xl">
        Your business security,
        <br />
        made simple.
      </h1>

      <p className={`${typography.body} mt-4 max-w-md`}>
        Sentinel Shield monitors identity theft, email scams, data leaks, and
        deepfake impersonation so you don&apos;t have to. Plain language, one
        glance, one action.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={() => router.push("/signup")}>
          Create your account
          <ArrowRight className="ml-2 size-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/login")}
        >
          Sign in
        </Button>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          { title: "Real-time monitoring", desc: "Identity, email, leaks, and deepfake — all in one place." },
          { title: "Plain-language alerts", desc: "No jargon. Just what happened and what to do next." },
          { title: "One-tap panic button", desc: "Something wrong? Press the button. We handle the rest." },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-[var(--color-neutral-200)] bg-white p-5 text-left shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold text-[var(--color-neutral-900)]">
              {item.title}
            </p>
            <p className={`${typography.body} mt-1`}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
