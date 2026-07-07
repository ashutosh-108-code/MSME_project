import Link from "next/link";

import type { SecurityScore } from "../../types/score";
import { typography } from "../../styles/tokens";

type ScoreDisplayProps = {
  score: SecurityScore;
};

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const value = Math.min(100, Math.max(0, Math.round(score.value)));
  const isSafe = score.status === "safe" || score.actionRequiredCount === 0;

  return (
    <section className="rounded-2xl border border-[var(--color-neutral-200)] bg-white p-5 shadow-[var(--shadow-soft)]">
      <p className={typography.label}>Security score</p>

      <div className="mt-4 flex items-end gap-2">
        <p className="text-5xl font-bold leading-none tracking-tight text-[var(--color-neutral-900)]">
          {value}
        </p>
        <p className="pb-1 text-sm font-medium text-[var(--color-neutral-500)]">
          /100
        </p>
      </div>

      <span
        className={
          isSafe
            ? "mt-3 inline-flex rounded-full bg-[var(--color-safe-green-50)] px-3 py-0.5 text-xs font-semibold text-[var(--color-safe-green-700)]"
            : "mt-3 inline-flex rounded-full bg-[var(--color-action-red-50)] px-3 py-0.5 text-xs font-semibold text-[var(--color-action-red-600)]"
        }
      >
        {isSafe ? "SAFE" : "ACTION REQUIRED"}
      </span>

      {score.lastCheckedLabel ? (
        <p className={`${typography.body} mt-3`}>
          Last checked {score.lastCheckedLabel}
        </p>
      ) : null}

      <Link
        className="mt-4 inline-flex text-sm font-semibold text-[var(--color-safe-green-700)] underline-offset-4 hover:underline"
        href="#score-details"
      >
        View details
      </Link>
    </section>
  );
}
