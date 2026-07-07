import Link from "next/link";
import { Database, Mail, ShieldCheck, UserCheck, Video } from "lucide-react";

import type { ActivityItem } from "../../lib/mock/mockActivity";
import { typography } from "../../styles/tokens";

const typeIcon = {
  identity: UserCheck,
  email: Mail,
  leak: Database,
  deepfake: Video,
  system: ShieldCheck,
};

const typeColor = {
  identity: "text-[var(--color-safe-green-600)]",
  email: "text-[var(--color-action-amber-600)]",
  leak: "text-[var(--color-action-red-600)]",
  deepfake: "text-[var(--color-neutral-700)]",
  system: "text-[var(--color-neutral-500)]",
};

type ActivityFeedProps = {
  items: ActivityItem[];
  maxItems?: number;
};

export function ActivityFeed({ items, maxItems = 3 }: ActivityFeedProps) {
  const displayed = maxItems ? items.slice(0, maxItems) : items;
  const hasMore = items.length > maxItems;

  if (items.length === 0) {
    return (
      <p className={`${typography.body} py-4 text-center`}>
        No recent activity.
      </p>
    );
  }

  return (
    <div>
      <div className="divide-y divide-[var(--color-neutral-100)]">
        {displayed.map((item) => {
          const Icon = typeIcon[item.type];
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0"
            >
              <Icon
                className={`mt-0.5 size-4 shrink-0 ${typeColor[item.type]}`}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-sm leading-5 text-[var(--color-neutral-900)]">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-[var(--color-neutral-500)]">
                  {item.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore ? (
        <Link
          className="mt-3 inline-flex text-sm font-semibold text-[var(--color-safe-green-700)] underline-offset-4 hover:underline"
          href="/"
        >
          View all activity
        </Link>
      ) : null}
    </div>
  );
}
