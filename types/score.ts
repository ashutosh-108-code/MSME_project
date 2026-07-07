export type SecurityScoreStatus = "safe" | "action_required";

export type SecurityScore = {
  value: number;
  status: SecurityScoreStatus;
  actionRequiredCount: number;
  lastCheckedLabel?: string;
};

