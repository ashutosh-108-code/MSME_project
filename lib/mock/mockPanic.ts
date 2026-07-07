import type { PanicCase, PanicCategory } from "../../types/panic";

function createCaseId() {
  const digits = Math.floor(1000 + Math.random() * 9000);

  return `SS-${digits}`;
}

export function createPanicCase(
  category: PanicCategory,
  detail?: string | Blob,
): PanicCase {
  return {
    caseId: createCaseId(),
    category,
    createdAt: Date.now(),
    detail,
    resolved: false,
  };
}
