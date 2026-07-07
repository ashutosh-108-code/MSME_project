import type { Alert } from "../../types/alert";

export const deepfakeAlert: Alert = {
  id: "deepfake-voice-payment-call",
  severity: "info",
  title: "Voice call check completed",
  description:
    "A recent payment-related call was reviewed and no signs of voice impersonation were found.",
  timestamp: "Yesterday, 4:05 PM",
};
