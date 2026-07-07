import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

import { AlertList } from "../../../components/alerts/AlertList";
import { Card } from "../../../components/ui/card";
import { emailAlert } from "../../../lib/mock/emailAlert";
import { typography } from "../../../styles/tokens";

export default function EmailPage() {
  const alerts = [emailAlert];

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <Link
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-neutral-700)] hover:text-[var(--color-neutral-900)]"
          href="/"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex items-start gap-4">
        <Mail
          className="mt-1 size-8 text-[var(--color-safe-green-600)]"
          aria-hidden="true"
        />
        <div>
          <p className={typography.label}>Email safety</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal text-[var(--color-neutral-900)]">
            Business email protection
          </h1>
          <p className={`${typography.body} mt-2 max-w-2xl`}>
            Suspicious payment requests, vendor messages, and potential phishing
            attempts. We check sender domains, DMARC records, and known scam
            patterns.
          </p>
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-semibold tracking-normal text-[var(--color-neutral-900)]">
          Active alerts
        </h2>
        <div className="mt-4">
          <AlertList alerts={alerts} moduleName="Email safety" />
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold tracking-normal text-[var(--color-neutral-900)]">
          About email checks
        </h2>
        <p className={`${typography.body} mt-2`}>
          We check the sender domain and email headers — not the message body.
          If a sender domain looks slightly different from a known vendor or
          supplier, we flag it so you can verify before making a payment.
        </p>
      </Card>
    </main>
  );
}
