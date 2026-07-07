import { Clock, UserCheck } from "lucide-react";

import { typography } from "../../styles/tokens";

type EscalationStatusProps = {
  status: "in_progress" | "escalated" | "resolved";
};

const statusConfig = {
  in_progress: {
    icon: Clock,
    label: "We are looking into this",
    description:
      "Your case has been received. A team member will review it shortly.",
    border: "border-[var(--color-action-amber-500)]",
    bg: "bg-[var(--color-action-amber-50)]",
  },
  escalated: {
    icon: UserCheck,
    label: "Escalated to a human agent",
    description:
      "A real person has picked up your case. You will hear back soon.",
    border: "border-[var(--color-safe-green-500)]",
    bg: "bg-[var(--color-safe-green-50)]",
  },
  resolved: {
    icon: UserCheck,
    label: "Case resolved",
    description: "This case has been marked resolved.",
    border: "border-[var(--color-neutral-300)]",
    bg: "bg-[var(--color-neutral-50)]",
  },
};

export function EscalationStatus({ status }: EscalationStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-lg border-l-4 ${config.border} ${config.bg} p-4`}
    >
      <div className="flex items-start gap-3">
        <Icon
          className="mt-0.5 size-5 text-[var(--color-neutral-700)]"
          aria-hidden="true"
        />
        <div>
          <p className="text-base font-semibold tracking-normal text-[var(--color-neutral-900)]">
            {config.label}
          </p>
          <p className={`${typography.body} mt-1`}>{config.description}</p>
        </div>
      </div>
    </div>
  );
}
