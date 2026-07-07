"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { usePanic } from "../../lib/PanicContext";
import type { PanicCategory } from "../../types/panic";
import { CategorySelect } from "./CategorySelect";
import { ConfirmTakeover } from "./ConfirmTakeover";
import { DetailReport, type DetailReportSubmit } from "./DetailReport";
import { SuccessPopup } from "./SuccessPopup";

type PanicFlowStep = "idle" | "confirm" | "category" | "detail";

export function PanicButton() {
  const { createCase } = usePanic();
  const [step, setStep] = useState<PanicFlowStep>("idle");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  function handleCategorySelect(category: Exclude<PanicCategory, "other">) {
    createCase(category);
    setStep("idle");
    setIsPulsing(false);
    setShowSuccess(true);
  }

  function handleDetailSubmit(report: DetailReportSubmit) {
    const detail = report.mode === "voice" ? report.audioBlob : report.text;
    createCase("other", detail);
    setStep("idle");
    setIsPulsing(false);
    setShowSuccess(true);
  }

  function handleSuccessClose() {
    setShowSuccess(false);
    setIsPulsing(true);
  }

  return (
    <>
      <button
        className="group relative mx-auto flex size-56 flex-col items-center justify-center rounded-full bg-gradient-to-b from-[var(--color-action-red-500)] to-[var(--color-action-red-600)] text-white shadow-xl shadow-[var(--color-action-red-500)]/40 transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-action-red-500)]/50 focus:outline-none focus:ring-4 focus:ring-[var(--color-action-red-500)]/50 focus:ring-offset-4"
        onClick={() => setStep("confirm")}
        type="button"
      >
        {isPulsing && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-[var(--color-action-red-500)] opacity-30"
          />
        )}
        <AlertTriangle className="mb-1.5 size-12" aria-hidden="true" />
        <span className="text-lg font-bold tracking-[0.15em]">PANIC</span>
      </button>

      {step === "confirm" ? (
        <ConfirmTakeover
          onCancel={() => setStep("idle")}
          onConfirm={() => setStep("category")}
        />
      ) : null}

      {step === "category" ? (
        <CategorySelect
          onNeedsDetail={() => setStep("detail")}
          onSelect={handleCategorySelect}
        />
      ) : null}

      {step === "detail" ? (
        <DetailReport onSubmit={handleDetailSubmit} />
      ) : null}

      {showSuccess ? <SuccessPopup onClose={handleSuccessClose} /> : null}
    </>
  );
}
