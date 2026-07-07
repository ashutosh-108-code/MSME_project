"use client";

import { useState } from "react";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { EscalationStatus } from "../../../components/panic/EscalationStatus";
import { IncidentReportPreview } from "../../../components/panic/IncidentReportPreview";
import type { PanicCase } from "../../../types/panic";
import { createPanicCase } from "../../../lib/mock/mockPanic";
import { typography } from "../../../styles/tokens";

export default function PanicPage() {
  const [panicCase, setPanicCase] = useState<PanicCase | null>(null);
  const [escalationStatus, setEscalationStatus] = useState<
    "in_progress" | "escalated" | "resolved" | null
  >(null);

  function handleStartIncident() {
    const newCase = createPanicCase("other");
    setPanicCase(newCase);
    setEscalationStatus("in_progress");
    setTimeout(() => setEscalationStatus("escalated"), 3000);
  }

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
        <ShieldAlert
          className="mt-1 size-8 text-[var(--color-action-amber-600)]"
          aria-hidden="true"
        />
        <div>
          <p className={typography.label}>Urgent response</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal text-[var(--color-neutral-900)]">
            Panic button
          </h1>
          <p className={`${typography.body} mt-2 max-w-2xl`}>
            Use this when you believe your business account, payment, device, or
            identity is at risk right now. We will snapshot your dashboard state
            and start the urgent response flow.
          </p>
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-semibold tracking-normal text-[var(--color-neutral-900)]">
          Start an incident
        </h2>
        <p className={`${typography.body} mt-2`}>
          Press the button below to create a snapshot and begin triage.
        </p>
        <button
          className="mt-4 inline-flex h-12 items-center justify-center rounded-md bg-[var(--color-action-amber-500)] px-6 text-sm font-semibold text-[var(--color-neutral-900)] hover:bg-[var(--color-action-amber-600)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-amber-600)] focus:ring-offset-2"
          onClick={handleStartIncident}
          type="button"
        >
          <ShieldAlert className="mr-2 size-5" aria-hidden="true" />
          Start incident response
        </button>
      </Card>

      {panicCase ? <IncidentReportPreview panicCase={panicCase} /> : null}

      {escalationStatus ? (
        <EscalationStatus status={escalationStatus} />
      ) : null}
    </main>
  );
}
