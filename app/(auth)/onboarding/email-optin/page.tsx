"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ShieldCheck } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { useAuth } from "../../../../lib/AuthContext";
import { typography } from "../../../../styles/tokens";

export default function EmailOptinPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [emailProtected, setEmailProtected] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const handleContinue = () => {
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--color-safe-green-50)] px-4 py-1.5 text-xs font-semibold text-[var(--color-safe-green-700)]">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Sentinel Shield
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-[var(--color-neutral-900)]">
          Protect your business email
        </h1>
        <p className={`${typography.body} mt-2`}>
          We can monitor your inbox for scam invoices, fake payment requests, and
          impersonation attempts.
        </p>
      </div>

      <Card className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-safe-green-50)]">
            <Mail className="size-5 text-[var(--color-safe-green-600)]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-neutral-900)]">
              Email Protection
            </p>
            <p className={`${typography.body} mt-0.5`}>
              Connect your Gmail account so we can scan email headers for
              suspicious activity. We only read metadata — never email content.
            </p>
          </div>
        </div>

        <div className={`${typography.body} rounded-md bg-[var(--color-neutral-100)] p-3`}>
          You can skip this now and enable it later from Settings.
        </div>

        <div className="flex flex-col gap-2">
          {emailProtected ? (
            <div className="rounded-md bg-[var(--color-safe-green-50)] px-4 py-3 text-center text-sm font-medium text-[var(--color-safe-green-700)]">
              Your Google account will be connected on the next screen.
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => setEmailProtected(true)}
            >
              <Mail className="mr-2 size-4" />
              Connect Gmail
            </Button>
          )}

          <Button className="w-full" size="lg" onClick={handleContinue}>
            {emailProtected ? "Continue to dashboard" : "Skip, go to dashboard"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
