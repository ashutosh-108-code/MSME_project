import { ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";

import { AlertList } from "../../../components/alerts/AlertList";
import { TakedownButton } from "../../../components/alerts/TakedownButton";
import { Card } from "../../../components/ui/card";
import { identityAlert } from "../../../lib/mock/identityAlert";
import { typography } from "../../../styles/tokens";

export default function IdentityPage() {
  const alerts = [identityAlert];

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
        <Globe
          className="mt-1 size-8 text-[var(--color-safe-green-600)]"
          aria-hidden="true"
        />
        <div>
          <p className={typography.label}>Identity monitoring</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal text-[var(--color-neutral-900)]">
            Identity access
          </h1>
          <p className={`${typography.body} mt-2 max-w-2xl`}>
            Staff logins, owner approvals, and account access. We check for
            lookalike domains, fake social profiles, and unusual login activity.
          </p>
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-semibold tracking-normal text-[var(--color-neutral-900)]">
          Active alerts
        </h2>
        <div className="mt-4">
          <AlertList alerts={alerts} moduleName="Identity access" />
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold tracking-normal text-[var(--color-neutral-900)]">
          Quick actions
        </h2>
        <p className={`${typography.body} mt-2`}>
          Found a fake website pretending to be your business? Start a takedown
          request below.
        </p>
        <div className="mt-4">
          <TakedownButton targetLabel="fake website" />
        </div>
      </Card>
    </main>
  );
}
