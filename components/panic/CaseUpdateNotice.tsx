"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { usePanic } from "../../lib/PanicContext";

const categoryLabels: Record<string, string> = {
  fake_identity: "fake identity report",
  email_scam: "email scam report",
  employee_issue: "employee security report",
  other: "security report",
};

export function CaseUpdateNotice() {
  const { completedCase, dismissNotice } = usePanic();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (completedCase) {
      const timer = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(timer);
    }
    setVisible(false);
  }, [completedCase]);

  if (!completedCase) return null;

  const categoryLabel = categoryLabels[completedCase.category] ?? "report";

  return (
    <div
      className="sticky top-0 z-30 border-b border-[var(--color-safe-green-100)] bg-[var(--color-safe-green-50)] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-sm">
          <span className="shrink-0 rounded-full bg-[var(--color-safe-green-100)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-safe-green-700)]">
            {completedCase.caseId}
          </span>
          <p className="text-[var(--color-neutral-900)]">
            <span className="font-semibold">Update on Case {completedCase.caseId}:</span>{" "}
            our team has received your {categoryLabel} and is on it.
          </p>
        </div>
        <button
          className="shrink-0 rounded-full p-1 text-[var(--color-neutral-500)] hover:bg-[var(--color-safe-green-100)] hover:text-[var(--color-neutral-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-safe-green-600)] focus:ring-offset-2"
          onClick={dismissNotice}
          type="button"
          aria-label="Dismiss notice"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
