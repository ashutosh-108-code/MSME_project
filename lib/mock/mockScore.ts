import type { SecurityScore } from "../../types/score";

export const mockSecurityScore: SecurityScore = {
  value: 82,
  status: "action_required",
  actionRequiredCount: 3,
  lastCheckedLabel: "today at 10:30 AM",
};
