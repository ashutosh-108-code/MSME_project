import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { typography } from "../../styles/tokens";

type ModuleCardProps = {
  name: string;
  href: string;
  alertCount: number;
  description?: string;
};

export function ModuleCard({ name, href, alertCount, description }: ModuleCardProps) {
  const isSafe = alertCount === 0;
  const statusLabel = isSafe ? "Safe" : `${alertCount} ${alertCount === 1 ? "alert" : "alerts"}`;

  return (
    <Link
      className="group block rounded-lg border border-[var(--color-neutral-200)] bg-white p-4 shadow-[var(--shadow-soft)] transition hover:border-[var(--color-safe-green-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-safe-green-600)] focus:ring-offset-2"
      href={href}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold tracking-normal text-[var(--color-neutral-900)]">
            {name}
          </p>
          {description ? <p className={`${typography.body} mt-2`}>{description}</p> : null}
        </div>
        <ChevronRight
          className="mt-0.5 size-5 shrink-0 text-[var(--color-neutral-500)] transition group-hover:translate-x-0.5 group-hover:text-[var(--color-safe-green-700)]"
          aria-hidden="true"
        />
      </div>

      <span
        className={[
          "mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold",
          isSafe
            ? "bg-[var(--color-safe-green-50)] text-[var(--color-safe-green-700)]"
            : "bg-[var(--color-action-amber-50)] text-[var(--color-action-amber-600)]",
        ].join(" ")}
      >
        {statusLabel}
      </span>
    </Link>
  );
}
