import { ArrowLeft, Database } from "lucide-react";
import Link from "next/link";

import { AlertList } from "../../../components/alerts/AlertList";
import { Card } from "../../../components/ui/card";
import { leakAlert } from "../../../lib/mock/leakAlert";
import { typography } from "../../../styles/tokens";

export default function LeaksPage() {
  const alerts = [leakAlert];

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <Link
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-neutral-700)] hover:text-[var(--color-neutral-900)]"
          href="/"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex items-start gap-4">
        <Database
          className="mt-1 size-8 text-[var(--color-safe-green-600)]"
          aria-hidden="true"
        />
        <div>
          <p className={typography.label}>Data leaks</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal text-[var(--color-neutral-900)]">
            Data leak watch
          </h1>
          <p className={`${typography.body} mt-2 max-w-2xl`}>
            Exposed passwords, leaked business contact details, and compromised
            accounts. We monitor paste sites and breach databases.
          </p>
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-semibold tracking-normal text-[var(--color-neutral-900)]">
          Active alerts
        </h2>
        <div className="mt-4">
          <AlertList alerts={alerts} moduleName="Data leaks" />
        </div>
      </Card>
    </main>
  );
}
