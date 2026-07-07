import type { ReactNode } from "react";

type ModuleGridProps = {
  children: ReactNode;
};

export function ModuleGrid({ children }: ModuleGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {children}
    </div>
  );
}
