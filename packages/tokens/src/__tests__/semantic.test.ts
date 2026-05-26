import { lightTokens, darkTokens } from '../semantic'

function getDeepKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null) {
      return getDeepKeys(value as Record<string, unknown>, path)
    }
    return [path]
  })
}

function getAllValues(obj: Record<string, unknown>): string[] {
  return Object.values(obj).flatMap((value) => {
    if (typeof value === 'object' && value !== null) {
      return getAllValues(value as Record<string, unknown>)
    }
    return [value as string]
  })
}

describe('semantic tokens shape', () => {
  it('lightTokens and darkTokens have the same top-level keys', () => {
    expect(Object.keys(lightTokens).sort()).toEqual(
      Object.keys(darkTokens).sort(),
    )
  })

  it('lightTokens and darkTokens have the same nested keys', () => {
    const lightKeys = getDeepKeys(lightTokens as unknown as Record<string, unknown>)
    const darkKeys = getDeepKeys(darkTokens as unknown as Record<string, unknown>)
    const lightRequired = lightKeys.filter((k) => k !== 'bg.sidebarSecondary')
    const darkRequired = darkKeys.filter((k) => k !== 'bg.sidebarSecondary')
    expect(lightRequired.sort()).toEqual(darkRequired.sort())
  })
})

describe('semantic token values', () => {
  it('all lightTokens values are non-empty strings', () => {
    for (const value of getAllValues(lightTokens as unknown as Record<string, unknown>)) {
      expect(typeof value).toBe('string')
      expect(value.length).toBeGreaterThan(0)
    }
  })

  it('all darkTokens values are non-empty strings', () => {
    for (const value of getAllValues(darkTokens as unknown as Record<string, unknown>)) {
      expect(typeof value).toBe('string')
      expect(value.length).toBeGreaterThan(0)
    }
  })
})

describe('brand colors in themes', () => {
  it('lightTokens contains brand color tokens', () => {
    expect(lightTokens.text.brand).toBeTruthy()
    expect(lightTokens.bg.brand).toBeTruthy()
    expect(lightTokens.border.brand).toBeTruthy()
  })

  it('darkTokens contains brand color tokens', () => {
    expect(darkTokens.text.brand).toBeTruthy()
    expect(darkTokens.bg.brand).toBeTruthy()
    expect(darkTokens.border.brand).toBeTruthy()
  })
})
