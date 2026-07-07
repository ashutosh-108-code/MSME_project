export type ActivityItem = {
  id: string;
  label: string;
  timestamp: string;
  type: "identity" | "email" | "leak" | "deepfake" | "system";
};

export const mockActivity: ActivityItem[] = [
  {
    id: "act-1",
    label: "New staff login reviewed and approved",
    timestamp: "Today, 11:15 AM",
    type: "identity",
  },
  {
    id: "act-2",
    label: "Vendor email domain check passed",
    timestamp: "Today, 10:45 AM",
    type: "email",
  },
  {
    id: "act-3",
    label: "Security score updated to 82",
    timestamp: "Today, 10:30 AM",
    type: "system",
  },
  {
    id: "act-4",
    label: "Password leak alert actioned — password changed",
    timestamp: "Yesterday, 6:30 PM",
    type: "leak",
  },
  {
    id: "act-5",
    label: "Payment call reviewed — no voice match found",
    timestamp: "Yesterday, 4:05 PM",
    type: "deepfake",
  },
  {
    id: "act-6",
    label: "Suspicious login attempt from new device flagged",
    timestamp: "Yesterday, 2:20 PM",
    type: "identity",
  },
];
