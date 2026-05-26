export const neutral = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0a0a0a',
} as const

export const brand = {
  default: '#6366f1',
  alt: '#4f46e5',
  light: '#818cf8',
} as const

export const status = {
  error: { light: '#dc2626', dark: '#f87171' },
  success: { light: '#16a34a', dark: '#4ade80' },
  warning: { light: '#f59e0b', dark: '#fbbf24' },
  info: { light: '#0ea5e9', dark: '#38bdf8' },
  pending: { light: '#f97316', dark: '#fb923c' },
} as const

export const statusBg = {
  error: { light: '#fef2f2', dark: '#450a0a' },
  success: { light: '#f0fdf4', dark: '#052e16' },
  warning: { light: '#fffbeb', dark: '#451a03' },
  info: { light: '#f0f9ff', dark: '#0c4a6e' },
  pending: { light: '#fff7ed', dark: '#431407' },
} as const

export const statusBorder = {
  error: { light: '#fecaca', dark: '#f87171' },
  success: { light: '#bbf7d0', dark: '#4ade80' },
  warning: { light: '#fde68a', dark: '#fbbf24' },
  info: { light: '#bae6fd', dark: '#0ea5e9' },
  pending: { light: '#fed7aa', dark: '#fb923c' },
} as const
