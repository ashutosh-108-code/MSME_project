"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, Type } from "lucide-react";

type DetailReportMode = "voice" | "text";

export type DetailReportSubmit =
  | {
      mode: "voice";
      audioBlob: Blob;
      text?: never;
    }
  | {
      mode: "text";
      text: string;
      audioBlob?: never;
    };

type DetailReportProps = {
  onSubmit?: (report: DetailReportSubmit) => void;
};

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function DetailReport({ onSubmit }: DetailReportProps) {
  const [mode, setMode] = useState<DetailReportMode>("voice");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recorderError, setRecorderError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const trimmedText = text.trim();
  const canSubmit = Boolean(audioBlob || trimmedText);

  useEffect(() => {
    if (!isRecording) {
      return;
    }

    const timerId = window.setInterval(() => {
      setRecordingSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isRecording]);

  async function startRecording() {
    setRecorderError(null);
    setAudioBlob(null);
    setRecordingSeconds(0);

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setRecorderError("Voice recording is not available in this browser. You can type the report instead.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      setRecorderError("Microphone access was not allowed. You can type the report instead.");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
  }

  function handleSubmit() {
    if (audioBlob) {
      onSubmit?.({ mode: "voice", audioBlob });
      return;
    }

    if (trimmedText) {
      onSubmit?.({ mode: "text", text: trimmedText });
    }
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-white px-4 py-8"
      role="dialog"
    >
      <div className="w-full max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-action-amber-600)]">
          One-time report
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[var(--color-neutral-900)] sm:text-4xl">
          Tell us what looks wrong
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--color-neutral-700)]">
          Send one short report. You can record a voice note or type a few lines.
        </p>

        <div className="mt-8 grid grid-cols-2 rounded-lg border border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] p-1">
          <button
            className={[
              "inline-flex h-11 items-center justify-center rounded-md text-sm font-semibold",
              mode === "voice"
                ? "bg-white text-[var(--color-neutral-900)] shadow-sm"
                : "text-[var(--color-neutral-700)] hover:text-[var(--color-neutral-900)]",
            ].join(" ")}
            onClick={() => setMode("voice")}
            type="button"
          >
            <Mic className="mr-2 size-4" aria-hidden="true" />
            Voice note
          </button>
          <button
            className={[
              "inline-flex h-11 items-center justify-center rounded-md text-sm font-semibold",
              mode === "text"
                ? "bg-white text-[var(--color-neutral-900)] shadow-sm"
                : "text-[var(--color-neutral-700)] hover:text-[var(--color-neutral-900)]",
            ].join(" ")}
            onClick={() => setMode("text")}
            type="button"
          >
            <Type className="mr-2 size-4" aria-hidden="true" />
            Text note
          </button>
        </div>

        <div className="mt-6 rounded-lg border border-[var(--color-neutral-200)] bg-white p-5 shadow-[var(--shadow-soft)]">
          {mode === "voice" ? (
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-base font-semibold text-[var(--color-neutral-900)]">
                    Record a short voice note
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-neutral-700)]">
                    Keep it brief: what happened, where you saw it, and whether money or access is involved.
                  </p>
                </div>
                <p className="text-2xl font-semibold tabular-nums text-[var(--color-neutral-900)]">
                  {formatSeconds(recordingSeconds)}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                {!isRecording ? (
                  <button
                    className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--color-action-amber-500)] px-5 text-sm font-semibold text-[var(--color-neutral-900)] hover:bg-[var(--color-action-amber-600)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-amber-600)] focus:ring-offset-2"
                    onClick={startRecording}
                    type="button"
                  >
                    <Mic className="mr-2 size-4" aria-hidden="true" />
                    Record
                  </button>
                ) : (
                  <button
                    className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--color-neutral-900)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-neutral-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral-900)] focus:ring-offset-2"
                    onClick={stopRecording}
                    type="button"
                  >
                    <Square className="mr-2 size-4" aria-hidden="true" />
                    Stop
                  </button>
                )}
              </div>

              {audioBlob ? (
                <p className="mt-4 text-sm font-medium text-[var(--color-safe-green-700)]">
                  Voice note saved for this report.
                </p>
              ) : null}
              {recorderError ? (
                <p className="mt-4 text-sm font-medium text-[var(--color-action-amber-600)]">
                  {recorderError}
                </p>
              ) : null}
            </div>
          ) : (
            <label className="block">
              <span className="text-base font-semibold text-[var(--color-neutral-900)]">
                Type what happened
              </span>
              <textarea
                className="mt-3 min-h-40 w-full resize-none rounded-lg border border-[var(--color-neutral-300)] bg-white px-4 py-3 text-base leading-7 text-[var(--color-neutral-900)] outline-none placeholder:text-[var(--color-neutral-500)] focus:border-[var(--color-action-amber-500)] focus:ring-2 focus:ring-[var(--color-action-amber-100)]"
                onChange={(event) => setText(event.target.value)}
                placeholder="Example: I saw a fake payment message, or a customer sent me a strange link..."
                value={text}
              />
            </label>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--color-neutral-900)] px-6 text-sm font-semibold text-white hover:bg-[var(--color-neutral-700)] disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-300)] disabled:text-[var(--color-neutral-700)]"
            disabled={!canSubmit}
            onClick={handleSubmit}
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

