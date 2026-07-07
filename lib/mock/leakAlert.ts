import type { Alert } from "../../types/alert";

export const leakAlert: Alert = {
  id: "leak-shared-password-found",
  severity: "critical",
  title: "A reused password may be exposed",
  description:
    "One business login appears in a known leaked password list. Change it before using that account again.",
  timestamp: "Yesterday, 6:20 PM",
  actionLabel: "Change password",
};
