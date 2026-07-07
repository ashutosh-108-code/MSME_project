import type { Alert } from "../../types/alert";

export const identityAlert: Alert = {
  id: "identity-staff-login-review",
  severity: "warning",
  title: "New staff login needs review",
  description:
    "A staff member signed in from a new phone. Please confirm it was expected before approving more access.",
  timestamp: "Today, 10:10 AM",
  actionLabel: "Review login",
};
