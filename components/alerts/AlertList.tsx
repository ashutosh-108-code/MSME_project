"use client";

import type { Alert } from "../../types/alert";
import { AlertCard } from "./AlertCard";
import { AlertEmptyState } from "./AlertEmptyState";

type AlertListProps = {
  alerts: Alert[];
  moduleName: string;
  onAction?: (alert: Alert) => void;
};

export function AlertList({ alerts, moduleName, onAction }: AlertListProps) {
  if (alerts.length === 0) {
    return <AlertEmptyState moduleName={moduleName} />;
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} onAction={onAction} />
      ))}
    </div>
  );
}
