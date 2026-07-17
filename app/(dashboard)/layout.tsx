import type { ReactNode } from "react";

import { PanicProvider } from "../../lib/PanicContext";
import { CaseProgressBar } from "../../components/panic/CaseProgressBar";
import { CaseUpdateNotice } from "../../components/panic/CaseUpdateNotice";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <PanicProvider>
      <CaseProgressBar />
      <CaseUpdateNotice />
      {children}
    </PanicProvider>
  );
}
