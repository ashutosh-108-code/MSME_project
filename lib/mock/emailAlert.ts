import type { Alert } from "../../types/alert";

export const emailAlert: Alert = {
  id: "email-payment-request-check",
  severity: "warning",
  title: "Payment email looks unusual",
  description:
    "An email asking for bank detail changes does not match your usual vendor message pattern.",
  timestamp: "Today, 9:45 AM",
  actionLabel: "Check email",
};
