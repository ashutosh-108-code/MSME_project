export type AlertSeverity = "info" | "warning" | "critical";

export type Alert = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: AlertSeverity;
  actionLabel?: string;
};
