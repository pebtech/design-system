export const DEFAULT_BRAND_COLOR = '#6366f1'

export type BrandColorOption = {
  name: string
  hex: string
}

export const BRAND_COLORS: BrandColorOption[] = [
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Sky', hex: '#0ea5e9' },
  { name: 'Teal', hex: '#14b8a6' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Violet', hex: '#8b5cf6' },
  { name: 'Slate', hex: '#64748b' },
]

export function normalizeBrandColor(hex?: string | null): string {
  if (!hex) return DEFAULT_BRAND_COLOR
  const trimmed = hex.trim()

  // 3-char shorthand → expand
  const match3 = trimmed.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
  if (match3) return `#${match3[1]}${match3[1]}${match3[2]}${match3[2]}${match3[3]}${match3[3]}`

  // 6-char standard
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed

  // 8-char with alpha → strip alpha
  const match8 = trimmed.match(/^#([0-9a-f]{6})[0-9a-f]{2}$/i)
  if (match8) return `#${match8[1]}`

  return DEFAULT_BRAND_COLOR
}

export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const normalized = normalizeBrandColor(hex)
  const r = parseInt(normalized.slice(1, 3), 16) / 255
  const g = parseInt(normalized.slice(3, 5), 16) / 255
  const b = parseInt(normalized.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export function getColorShades(hex: string) {
  const normalized = normalizeBrandColor(hex)
  const { h, s, l } = hexToHSL(normalized)

  return {
    50: hslToHex(h, Math.min(s + 10, 100), Math.min(l + 42, 97)),
    100: hslToHex(h, Math.min(s + 10, 100), Math.min(l + 35, 94)),
    200: hslToHex(h, Math.min(s + 5, 100), Math.min(l + 25, 88)),
    300: hslToHex(h, s, Math.min(l + 15, 78)),
    400: hslToHex(h, s, Math.min(l + 7, 68)),
    500: normalized,
    600: hslToHex(h, s, Math.max(l - 8, 20)),
    700: hslToHex(h, s, Math.max(l - 16, 15)),
    800: hslToHex(h, s, Math.max(l - 24, 10)),
    900: hslToHex(h, s, Math.max(l - 32, 8)),
  } as const
}

export function getBrandColorName(hex: string): string {
  return BRAND_COLORS.find((color) => color.hex === normalizeBrandColor(hex))?.name ?? 'Custom'
}
