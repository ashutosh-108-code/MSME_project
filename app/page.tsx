import { ShieldCheck } from "lucide-react";

import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { ModuleCard } from "../components/dashboard/ModuleCard";
import { ScoreDisplay } from "../components/dashboard/ScoreDisplay";
import { CollapsibleSection } from "../components/ui/CollapsibleSection";
import { PanicButton } from "../components/panic/PanicButton";
import { mockActivity } from "../lib/mock/mockActivity";
import { mockModuleAlerts } from "../lib/mock/mockAlerts";
import { mockSecurityScore } from "../lib/mock/mockScore";
import { typography } from "../styles/tokens";

export default function DashboardHome() {
  const totalAlerts = mockModuleAlerts.reduce(
    (sum, m) => sum + m.alerts.length,
    0,
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-safe-green-50)] px-4 py-1.5 text-xs font-semibold text-[var(--color-safe-green-700)]">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Business security
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-neutral-900)] sm:text-3xl">
          Shree Ganesh Traders
        </h1>
        <p className={`${typography.body} mt-2 max-w-lg`}>
          A few simple checks need your attention. We keep the language plain
          and focus only on what matters for your shop, staff, and payments.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="w-full sm:w-[30%]">
          <CollapsibleSection title="Security score" showChevron={false}>
            <ScoreDisplay score={mockSecurityScore} />
          </CollapsibleSection>
        </div>

        <div className="flex flex-col items-center pt-2">
          <p className={typography.label}>Urgent help</p>
          <div className="mt-3">
            <PanicButton />
          </div>
        </div>

        <CollapsibleSection
          title="Recent activity"
          badge={
            <span className="rounded-full bg-[var(--color-neutral-100)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-neutral-700)]">
              {mockActivity.length}
            </span>
          }
          className="w-full sm:w-[30%]"
          showChevron={false}
        >
          <ActivityFeed items={mockActivity} />
        </CollapsibleSection>
      </div>

      <div className="mt-10">
        <CollapsibleSection
          title="Monitoring modules"
          showChevron={false}
          badge={
            <span
              className={
                totalAlerts > 0
                  ? "rounded-full bg-[var(--color-action-amber-50)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-action-amber-600)]"
                  : "rounded-full bg-[var(--color-safe-green-50)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-safe-green-700)]"
              }
            >
              {totalAlerts > 0
                ? `${totalAlerts} alert${totalAlerts > 1 ? "s" : ""}`
                : "All clear"}
            </span>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {mockModuleAlerts.map((module) => (
              <ModuleCard
                alertCount={module.alerts.length}
                description={module.description}
                href={module.href}
                key={module.key}
                name={module.name}
              />
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </main>
  );
}
