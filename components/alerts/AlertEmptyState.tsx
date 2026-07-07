import { ShieldCheck } from "lucide-react";

import { typography } from "../../styles/tokens";

type AlertEmptyStateProps = {
  moduleName: string;
};

export function AlertEmptyState({ moduleName }: AlertEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--color-neutral-300)] bg-white px-6 py-12 text-center">
      <ShieldCheck
        className="mb-4 size-10 text-[var(--color-safe-green-500)]"
        aria-hidden="true"
      />
      <h3 className="text-lg font-semibold tracking-normal text-[var(--color-neutral-900)]">
        No threats found
      </h3>
      <p className={`${typography.body} mt-2 max-w-md`}>
        {moduleName} looks good. We are watching and will alert you if anything
        changes.
      </p>
    </div>
  );
}
