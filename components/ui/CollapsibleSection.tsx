"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type CollapsibleSectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: ReactNode;
  className?: string;
  showChevron?: boolean;
};

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  badge,
  className = "",
  showChevron = true,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-2xl border border-[var(--color-neutral-200)] bg-white shadow-[var(--shadow-soft)] ${className}`}>
      <button
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left focus:outline-none"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--color-neutral-900)]">
            {title}
          </span>
          {badge}
        </div>
        {showChevron ? (
          open ? (
            <ChevronDown className="size-4 shrink-0 text-[var(--color-neutral-500)]" />
          ) : (
            <ChevronRight className="size-4 shrink-0 text-[var(--color-neutral-500)]" />
          )
        ) : null}
      </button>
      {open ? <div className="px-5 pb-5">{children}</div> : null}
    </div>
  );
}
