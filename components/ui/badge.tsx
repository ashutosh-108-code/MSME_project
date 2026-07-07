import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        safe: "bg-[var(--color-safe-green-50)] text-[var(--color-safe-green-700)]",
        warning:
          "bg-[var(--color-action-amber-50)] text-[var(--color-action-amber-600)]",
        danger:
          "bg-[var(--color-action-red-50)] text-[var(--color-action-red-600)]",
        neutral:
          "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
