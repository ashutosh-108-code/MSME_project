import { ArrowLeft, Video } from "lucide-react";
import Link from "next/link";

import { AlertList } from "../../../components/alerts/AlertList";
import { Card } from "../../../components/ui/card";
import { deepfakeAlert } from "../../../lib/mock/deepfakeAlert";
import { typography } from "../../../styles/tokens";

export default function DeepfakePage() {
  const alerts = [deepfakeAlert];

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
        <Video
          className="mt-1 size-8 text-[var(--color-safe-green-600)]"
          aria-hidden="true"
        />
        <div>
          <p className={typography.label}>Voice and video checks</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal text-[var(--color-neutral-900)]">
            Deepfake & reputation watch
          </h1>
          <p className={`${typography.body} mt-2 max-w-2xl`}>
            Impersonation checks for calls, videos, and payment instructions. We
            monitor for AI-generated content misusing your business identity.
          </p>
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-semibold tracking-normal text-[var(--color-neutral-900)]">
          Activity log
        </h2>
        <div className="mt-4">
          <AlertList alerts={alerts} moduleName="Voice and video checks" />
        </div>
      </Card>
    </main>
  );
}
