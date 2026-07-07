"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { PanicCase, PanicCategory } from "../types/panic";
import { createPanicCase } from "./mock/mockPanic";

type PanicContextValue = {
  activeCase: PanicCase | null;
  completedCase: PanicCase | null;
  createCase: (category: PanicCategory, detail?: string | Blob) => void;
  resolveCase: () => void;
  dismissNotice: () => void;
};

const PanicContext = createContext<PanicContextValue | null>(null);

export function PanicProvider({ children }: { children: ReactNode }) {
  const [activeCase, setActiveCase] = useState<PanicCase | null>(null);
  const [completedCase, setCompletedCase] = useState<PanicCase | null>(null);

  const createCase = useCallback(
    (category: PanicCategory, detail?: string | Blob) => {
      setActiveCase(createPanicCase(category, detail));
    },
    [],
  );

  const resolveCase = useCallback(() => {
    setActiveCase((current) => {
      if (!current) return current;
      setCompletedCase(current);
      return { ...current, resolved: true };
    });
  }, []);

  const dismissNotice = useCallback(() => {
    setCompletedCase(null);
    setActiveCase(null);
  }, []);

  const value = useMemo(
    () => ({ activeCase, completedCase, createCase, resolveCase, dismissNotice }),
    [activeCase, completedCase, createCase, resolveCase, dismissNotice],
  );

  return (
    <PanicContext.Provider value={value}>
      {children}
    </PanicContext.Provider>
  );
}

export function usePanic(): PanicContextValue {
  const context = useContext(PanicContext);
  if (!context) {
    throw new Error("usePanic must be used within a PanicProvider");
  }
  return context;
}
