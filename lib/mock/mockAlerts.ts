import { deepfakeAlert } from "./deepfakeAlert";
import { emailAlert } from "./emailAlert";
import { identityAlert } from "./identityAlert";
import { leakAlert } from "./leakAlert";

export const mockModuleAlerts = [
  {
    key: "identity",
    name: "Identity access",
    href: "/identity",
    description: "Staff logins, owner approvals, and account access.",
    alerts: [identityAlert],
  },
  {
    key: "email",
    name: "Email safety",
    href: "/email",
    description: "Suspicious payment requests and vendor messages.",
    alerts: [emailAlert],
  },
  {
    key: "leak",
    name: "Data leaks",
    href: "/leaks",
    description: "Exposed passwords and business contact details.",
    alerts: [leakAlert],
  },
  {
    key: "deepfake",
    name: "Voice and video checks",
    href: "/deepfake",
    description: "Impersonation checks for calls and payment instructions.",
    alerts: [deepfakeAlert],
  },
] as const;
