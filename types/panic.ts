export type PanicCategory =
  | "fake_identity"
  | "email_scam"
  | "employee_issue"
  | "other";

export type PanicCase = {
  caseId: string;
  category: PanicCategory;
  createdAt: number;
  detail?: string | Blob;
  resolved: boolean;
};
