"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

type TakedownButtonProps = {
  targetLabel: string;
  onStart?: () => void;
};

export function TakedownButton({ targetLabel, onStart }: TakedownButtonProps) {
  const [status, setStatus] = useState<"idle" | "requested" | "completed">(
    "idle",
  );

  function handleClick() {
    setStatus("requested");
    onStart?.();
    setTimeout(() => setStatus("completed"), 2000);
  }

  if (status === "completed") {
    return (
      <div className="inline-flex items-center gap-2 rounded-md bg-[var(--color-safe-green-50)] px-4 py-2 text-sm font-semibold text-[var(--color-safe-green-700)]">
        <CheckCircle2 className="size-4" aria-hidden="true" />
        Takedown requested
      </div>
    );
  }

  return (
    <button
      className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--color-action-amber-500)] px-4 text-sm font-semibold text-[var(--color-neutral-900)] hover:bg-[var(--color-action-amber-600)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-amber-600)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={status === "requested"}
      onClick={handleClick}
      type="button"
    >
      <AlertTriangle className="mr-2 size-4" aria-hidden="true" />
      {status === "requested" ? "Requesting..." : `Start takedown — ${targetLabel}`}
    </button>
  );
}
