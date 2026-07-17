import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";

import { AuthProvider } from "../lib/AuthContext";
import { colors, shadows, typography } from "../styles/tokens";

import "./globals.css";

export const metadata: Metadata = {
  title: "Kteq Security Dashboard",
  description: "A calm security dashboard for Indian MSME business owners.",
};

const cssVariables = {
  "--color-safe-green-50": colors.safeGreen[50],
  "--color-safe-green-100": colors.safeGreen[100],
  "--color-safe-green-500": colors.safeGreen[500],
  "--color-safe-green-600": colors.safeGreen[600],
  "--color-safe-green-700": colors.safeGreen[700],
  "--color-action-amber-50": colors.actionAmber[50],
  "--color-action-amber-100": colors.actionAmber[100],
  "--color-action-amber-500": colors.actionAmber[500],
  "--color-action-amber-600": colors.actionAmber[600],
  "--color-action-red-50": colors.actionRed[50],
  "--color-action-red-100": colors.actionRed[100],
  "--color-action-red-500": colors.actionRed[500],
  "--color-action-red-600": colors.actionRed[600],
  "--color-neutral-50": colors.neutral[50],
  "--color-neutral-100": colors.neutral[100],
  "--color-neutral-200": colors.neutral[200],
  "--color-neutral-300": colors.neutral[300],
  "--color-neutral-500": colors.neutral[500],
  "--color-neutral-700": colors.neutral[700],
  "--color-neutral-900": colors.neutral[900],
  "--shadow-soft": shadows.soft,
} as CSSProperties;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <body
        className="min-h-screen bg-[var(--color-neutral-50)] antialiased"
        style={{
          ...cssVariables,
          fontFamily: typography.fontFamily,
        }}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
