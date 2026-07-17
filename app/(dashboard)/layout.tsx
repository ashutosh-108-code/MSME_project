import type { ReactNode } from "react";

import { PanicProvider } from "../../lib/PanicContext";
import { CaseProgressBar } from "../../components/panic/CaseProgressBar";
import { CaseUpdateNotice } from "../../components/panic/CaseUpdateNotice";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <PanicProvider>
      <CaseProgressBar />
      <CaseUpdateNotice />
      <DashboardHeader />
      {children}
    </PanicProvider>
  );
}
