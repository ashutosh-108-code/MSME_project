"use client";

import { LogOut, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { useAuth } from "../../lib/AuthContext";

export function DashboardHeader() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-neutral-100)] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-[var(--color-safe-green-600)]" />
          <span className="text-sm font-bold text-[var(--color-neutral-900)]">Sentinel Shield</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[var(--color-neutral-500)] sm:block">
            {user?.businessName ?? "Shree Ganesh Traders"}
          </span>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-[var(--color-neutral-500)] transition hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-neutral-900)]"
          >
            <LogOut className="size-3.5" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
