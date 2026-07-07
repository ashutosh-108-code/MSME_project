"use client";

import { useEffect, useRef, useState } from "react";

import { usePanic } from "../../lib/PanicContext";

const PANIC_CASE_WINDOW_MS = 5 * 60 * 1000;

function getProgress(createdAt: number) {
  const elapsed = Date.now() - createdAt;

  return Math.min(100, Math.max(0, (elapsed / PANIC_CASE_WINDOW_MS) * 100));
}

export function CaseProgressBar() {
  const { activeCase, resolveCase } = usePanic();
  const [progress, setProgress] = useState(() =>
    activeCase ? getProgress(activeCase.createdAt) : 0,
  );
  const hasRequestedResolve = useRef(false);

  useEffect(() => {
    if (!activeCase) return;
    hasRequestedResolve.current = false;
    setProgress(getProgress(activeCase.createdAt));
  }, [activeCase?.caseId, activeCase?.createdAt, activeCase]);

  useEffect(() => {
    if (!activeCase || activeCase.resolved || hasRequestedResolve.current)
      return;

    if (progress >= 100) {
      hasRequestedResolve.current = true;
      const resolveTimerId = window.setTimeout(resolveCase, 1000);
      return () => window.clearTimeout(resolveTimerId);
    }

    const timerId = window.setInterval(() => {
      setProgress(getProgress(activeCase.createdAt));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [activeCase, resolveCase, progress]);

  if (!activeCase) return null;

  const fillWidth = activeCase.resolved ? 100 : progress;
  const isComplete = activeCase.resolved || progress >= 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center gap-2 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-sm">
      <span className="shrink-0 rounded-full bg-[var(--color-safe-green-50)] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-safe-green-700)] tracking-wider">
        {activeCase.caseId}
      </span>
      <div
        aria-label={`Panic case progress for ${activeCase.caseId}`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(fillWidth)}
        className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--color-neutral-100)]"
        role="progressbar"
      >
        <div
          className={
            isComplete
              ? "h-full rounded-full bg-[var(--color-safe-green-500)]"
              : "h-full rounded-full bg-[var(--color-safe-green-500)] transition-[width] duration-1000 ease-linear"
          }
          style={{ width: `${fillWidth}%` }}
        />
      </div>
      <span className="shrink-0 text-[11px] font-medium text-[var(--color-neutral-500)] tabular-nums">
        {isComplete ? "DONE" : `${Math.round(fillWidth)}%`}
      </span>
    </div>
  );
}
