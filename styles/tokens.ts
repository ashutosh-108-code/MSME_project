export const colors = {
  safeGreen: {
    50: "#eefaf2",
    100: "#d8f3df",
    500: "#2f9e55",
    600: "#247a42",
    700: "#1f6338",
  },
  actionAmber: {
    50: "#fff8e6",
    100: "#ffedb8",
    500: "#d99000",
    600: "#b87500",
  },
  actionRed: {
    50: "#fff1f0",
    100: "#ffd9d6",
    500: "#d6453d",
    600: "#b8342d",
  },
  neutral: {
    50: "#f8fafc",
    100: "#eef2f6",
    200: "#dce3ea",
    300: "#c4ced8",
    500: "#64748b",
    700: "#334155",
    900: "#111827",
  },
  white: "#ffffff",
} as const;

export const typography = {
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  pageTitle: "text-2xl font-semibold tracking-normal text-[var(--color-neutral-900)]",
  sectionTitle: "text-lg font-semibold tracking-normal text-[var(--color-neutral-900)]",
  body: "text-sm leading-6 text-[var(--color-neutral-700)]",
  label: "text-xs font-medium uppercase tracking-wide text-[var(--color-neutral-500)]",
} as const;

export const radii = {
  sm: "0.375rem",
  md: "0.5rem",
} as const;

export const shadows = {
  soft: "0 1px 2px rgb(17 24 39 / 0.06), 0 8px 24px rgb(17 24 39 / 0.06)",
} as const;

export const tokens = {
  colors,
  typography,
  radii,
  shadows,
} as const;
