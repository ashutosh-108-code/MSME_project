type ConfirmTakeoverProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmTakeover({ onCancel, onConfirm }: ConfirmTakeoverProps) {
  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-white px-4 py-8"
      role="dialog"
    >
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-action-amber-600)]">
          Confirm urgent help
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[var(--color-neutral-900)] sm:text-4xl">
          Are you sure something is wrong?
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--color-neutral-700)]">
          Use this only when you believe your business account, payment, device, or
          identity is at risk right now. We will start the urgent response flow.
        </p>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--color-neutral-300)] bg-white px-5 text-sm font-semibold text-[var(--color-neutral-900)] hover:bg-[var(--color-neutral-50)] focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral-900)] focus:ring-offset-2"
            onClick={onCancel}
            type="button"
          >
            No, it was a mistake.
          </button>
          <button
            className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--color-action-amber-500)] px-5 text-sm font-semibold text-[var(--color-neutral-900)] hover:bg-[var(--color-action-amber-600)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-amber-600)] focus:ring-offset-2"
            onClick={onConfirm}
            type="button"
          >
            Yes, this is real.
          </button>
        </div>
      </div>
    </div>
  );
}
