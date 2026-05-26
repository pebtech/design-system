import {
  normalizeBrandColor,
  hexToHSL,
  hslToHex,
  getColorShades,
  getBrandColorName,
  DEFAULT_BRAND_COLOR,
} from '../brand-utils'

describe('normalizeBrandColor', () => {
  it('returns a valid hex as-is', () => {
    expect(normalizeBrandColor('#abcdef')).toBe('#abcdef')
  })

  it('returns default for null', () => {
    expect(normalizeBrandColor(null)).toBe(DEFAULT_BRAND_COLOR)
  })

  it('returns default for undefined', () => {
    expect(normalizeBrandColor(undefined)).toBe(DEFAULT_BRAND_COLOR)
  })

  it('returns default for empty string', () => {
    expect(normalizeBrandColor('')).toBe(DEFAULT_BRAND_COLOR)
  })

  it('returns default for invalid hex', () => {
    expect(normalizeBrandColor('#xyz')).toBe(DEFAULT_BRAND_COLOR)
    expect(normalizeBrandColor('not-a-color')).toBe(DEFAULT_BRAND_COLOR)
    expect(normalizeBrandColor('#12345')).toBe(DEFAULT_BRAND_COLOR)
  })

  it('is case-insensitive', () => {
    expect(normalizeBrandColor('#AABBCC')).toBe('#AABBCC')
  })
})

describe('hexToHSL', () => {
  it('converts pure red', () => {
    const hsl = hexToHSL('#ff0000')
    expect(hsl.h).toBeCloseTo(0, 0)
    expect(hsl.s).toBeCloseTo(100, 0)
    expect(hsl.l).toBeCloseTo(50, 0)
  })

  it('converts pure green', () => {
    const hsl = hexToHSL('#00ff00')
    expect(hsl.h).toBeCloseTo(120, 0)
    expect(hsl.s).toBeCloseTo(100, 0)
    expect(hsl.l).toBeCloseTo(50, 0)
  })

  it('converts pure blue', () => {
    const hsl = hexToHSL('#0000ff')
    expect(hsl.h).toBeCloseTo(240, 0)
    expect(hsl.s).toBeCloseTo(100, 0)
    expect(hsl.l).toBeCloseTo(50, 0)
  })

  it('converts white', () => {
    const hsl = hexToHSL('#ffffff')
    expect(hsl.s).toBeCloseTo(0, 0)
    expect(hsl.l).toBeCloseTo(100, 0)
  })

  it('converts black', () => {
    const hsl = hexToHSL('#000000')
    expect(hsl.s).toBeCloseTo(0, 0)
    expect(hsl.l).toBeCloseTo(0, 0)
  })
})

describe('hslToHex', () => {
  it('converts red HSL back to hex', () => {
    expect(hslToHex(0, 100, 50)).toBe('#ff0000')
  })

  it('converts green HSL back to hex', () => {
    expect(hslToHex(120, 100, 50)).toBe('#00ff00')
  })

  it('converts blue HSL back to hex', () => {
    expect(hslToHex(240, 100, 50)).toBe('#0000ff')
  })

  it('converts white HSL back to hex', () => {
    expect(hslToHex(0, 0, 100)).toBe('#ffffff')
  })

  it('converts black HSL back to hex', () => {
    expect(hslToHex(0, 0, 0)).toBe('#000000')
  })
})

describe('getColorShades', () => {
  it('returns an object with keys 50 through 900', () => {
    const shades = getColorShades('#3b82f6')
    const keys = Object.keys(shades).map(Number)
    expect(keys).toEqual([50, 100, 200, 300, 400, 500, 600, 700, 800, 900])
  })

  it('shade 500 equals the normalized input', () => {
    const hex = '#3b82f6'
    const shades = getColorShades(hex)
    expect(shades[500]).toBe(hex)
  })

  it('shade 500 equals default when given invalid input', () => {
    const shades = getColorShades('bad')
    expect(shades[500]).toBe(DEFAULT_BRAND_COLOR)
  })

  it('all shade values are valid hex strings', () => {
    const shades = getColorShades('#10b981')
    for (const value of Object.values(shades)) {
      expect(value).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })
})

describe('getBrandColorName', () => {
  it('returns name for a known preset', () => {
    expect(getBrandColorName('#3b82f6')).toBe('Blue')
    expect(getBrandColorName('#6366f1')).toBe('Indigo')
    expect(getBrandColorName('#f43f5e')).toBe('Rose')
  })

  it('returns Custom for an unknown color', () => {
    expect(getBrandColorName('#123456')).toBe('Custom')
  })

  it('returns name for default brand color', () => {
    expect(getBrandColorName(DEFAULT_BRAND_COLOR)).toBe('Indigo')
  })
})
