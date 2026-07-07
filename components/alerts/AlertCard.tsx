"use client";

import type { Alert } from "../../types/alert";

import { typography } from "../../styles/tokens";

type AlertCardProps = {
  alert: Alert;
  onAction?: (alert: Alert) => void;
};

const severityStyles = {
  info: {
    border: "border-l-[var(--color-safe-green-500)]",
    badge: "bg-[var(--color-safe-green-50)] text-[var(--color-safe-green-700)]",
    label: "Low priority",
  },
  warning: {
    border: "border-l-[var(--color-action-amber-500)]",
    badge: "bg-[var(--color-action-amber-50)] text-[var(--color-action-amber-600)]",
    label: "Needs review",
  },
  critical: {
    border: "border-l-[var(--color-action-red-500)]",
    badge: "bg-[var(--color-action-red-50)] text-[var(--color-action-red-600)]",
    label: "Act now",
  },
} as const;

export function AlertCard({ alert, onAction }: AlertCardProps) {
  const styles = severityStyles[alert.severity];

  return (
    <article
      className={`rounded-lg border border-l-4 border-[var(--color-neutral-200)] ${styles.border} bg-white p-4 shadow-[var(--shadow-soft)]`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold tracking-normal text-[var(--color-neutral-900)]">
              {alert.title}
            </h3>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
              {styles.label}
            </span>
          </div>
          <p className={`${typography.body} mt-2`}>{alert.description}</p>
          <time className="mt-3 block text-xs font-medium text-[var(--color-neutral-500)]">
            {alert.timestamp}
          </time>
        </div>

        {alert.actionLabel ? (
          <button
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-[var(--color-neutral-900)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-neutral-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral-900)] focus:ring-offset-2"
            onClick={() => onAction?.(alert)}
            type="button"
          >
            {alert.actionLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
}

