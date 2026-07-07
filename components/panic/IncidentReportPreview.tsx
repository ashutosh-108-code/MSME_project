import { FileText } from "lucide-react";

import type { PanicCase } from "../../types/panic";
import { typography } from "../../styles/tokens";

type IncidentReportPreviewProps = {
  panicCase: PanicCase;
};

export function IncidentReportPreview({ panicCase }: IncidentReportPreviewProps) {
  return (
    <div className="rounded-lg border border-[var(--color-neutral-200)] bg-white p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText
            className="size-6 text-[var(--color-neutral-700)]"
            aria-hidden="true"
          />
          <div>
            <p className="text-base font-semibold tracking-normal text-[var(--color-neutral-900)]">
              Incident report
            </p>
            <p className={`${typography.body} mt-0.5`}>
              Case {panicCase.caseId}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-[var(--color-neutral-100)] px-2.5 py-1 text-xs font-semibold text-[var(--color-neutral-700)]">
          {panicCase.category.replace("_", " ")}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm leading-6 text-[var(--color-neutral-700)]">
        <p>
          <span className="font-medium text-[var(--color-neutral-900)]">
            Reported:
          </span>{" "}
          {new Date(panicCase.createdAt).toLocaleString("en-IN")}
        </p>
        {panicCase.detail ? (
          <p>
            <span className="font-medium text-[var(--color-neutral-900)]">
              Detail:
            </span>{" "}
            {typeof panicCase.detail === "string"
              ? panicCase.detail
              : "Voice note attached"}
          </p>
        ) : null}
      </div>

      <div className="mt-4 rounded-md border border-dashed border-[var(--color-action-amber-500)] bg-[var(--color-action-amber-50)] px-4 py-3">
        <p className="text-sm font-semibold text-[var(--color-neutral-900)]">
          Draft — CERT-In report
        </p>
        <p className={`${typography.body} mt-1`}>
          A draft for CERT-In is ready for your review. No information has been
          submitted to any authority yet.
        </p>
      </div>
    </div>
  );
}
