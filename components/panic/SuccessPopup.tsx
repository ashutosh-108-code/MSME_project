"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

type SuccessPopupProps = {
  onClose: () => void;
};

export function SuccessPopup({ onClose }: SuccessPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = requestAnimationFrame(() => setVisible(true));
    const autoTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => {
      cancelAnimationFrame(showTimer);
      clearTimeout(autoTimer);
    };
  }, [onClose]);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white px-8 py-10 text-center shadow-2xl transition-all duration-300"
        style={{
          transform: visible ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
        }}
      >
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[var(--color-safe-green-50)]">
          <CheckCircle2
            className="size-10 text-[var(--color-safe-green-600)]"
            aria-hidden="true"
          />
        </div>

        <h2 className="mt-6 text-2xl font-semibold tracking-normal text-[var(--color-neutral-900)]">
          We have got it
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--color-neutral-700)]">
          Your problem has been taken into consideration. Please wait while we
          review it.
        </p>

        <div className="mt-8">
          <div
            aria-label="Processing"
            className="mx-auto h-1.5 w-48 overflow-hidden rounded-full bg-[var(--color-neutral-100)]"
            role="progressbar"
          >
            <div
              className="h-full animate-pulse rounded-full bg-[var(--color-safe-green-500)]"
              style={{ width: "60%" }}
            />
          </div>
          <p className="mt-3 text-xs font-medium text-[var(--color-neutral-500)]">
            Processing your request
          </p>
        </div>

        <button
          className="mt-8 inline-flex size-10 items-center justify-center rounded-full text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-neutral-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral-900)] focus:ring-offset-2"
          onClick={handleClose}
          type="button"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
}
