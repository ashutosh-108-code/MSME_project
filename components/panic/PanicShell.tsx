import type { ReactNode } from "react";

type PanicShellProps = {
  businessSlot: ReactNode;
  scoreSlot: ReactNode;
};

export function PanicShell({ businessSlot, scoreSlot }: PanicShellProps) {
  return (
    <header className="border-b border-[var(--color-neutral-200)] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        {businessSlot}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {scoreSlot}
        </div>
      </div>
    </header>
  );
}
