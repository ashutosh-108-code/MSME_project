import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--color-neutral-200)] bg-white p-5 shadow-[var(--shadow-soft)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
