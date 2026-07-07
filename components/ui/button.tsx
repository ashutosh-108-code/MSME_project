import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-neutral-900)] text-white hover:bg-[var(--color-neutral-700)] focus:ring-[var(--color-neutral-900)]",
        danger:
          "bg-[var(--color-action-red-500)] text-white hover:bg-[var(--color-action-red-600)] focus:ring-[var(--color-action-red-500)]",
        amber:
          "bg-[var(--color-action-amber-500)] text-[var(--color-neutral-900)] hover:bg-[var(--color-action-amber-600)] focus:ring-[var(--color-action-amber-600)]",
        outline:
          "border border-[var(--color-neutral-300)] bg-white text-[var(--color-neutral-900)] hover:bg-[var(--color-neutral-50)] focus:ring-[var(--color-neutral-900)]",
        ghost:
          "text-[var(--color-neutral-700)] hover:text-[var(--color-neutral-900)] hover:bg-[var(--color-neutral-100)] focus:ring-[var(--color-neutral-900)]",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
