import React, { useEffect } from 'react'
import { getColorShades } from '@peb/tokens'

export function BrandProvider({
  brandColor,
  children,
}: {
  brandColor: string
  children: React.ReactNode
}) {
  useEffect(() => {
    const shades = getColorShades(brandColor)
    const root = document.documentElement

    const entries = Object.entries(shades) as [string, string][]
    for (const [shade, hex] of entries) {
      root.style.setProperty(`--brand-${shade}`, hex)
    }

    root.style.setProperty('--text-brand', shades[500])
    root.style.setProperty('--text-brandAlt', shades[600])
    root.style.setProperty('--bg-brand', shades[500])
    root.style.setProperty('--border-brand', shades[500])
    root.style.setProperty('--border-focus', shades[500])
    root.style.setProperty('--hover-brand', shades[600])
    root.style.setProperty('--focus-primary', shades[500])

    return () => {
      for (const [shade] of entries) {
        root.style.removeProperty(`--brand-${shade}`)
      }
      root.style.removeProperty('--text-brand')
      root.style.removeProperty('--text-brandAlt')
      root.style.removeProperty('--bg-brand')
      root.style.removeProperty('--border-brand')
      root.style.removeProperty('--border-focus')
      root.style.removeProperty('--hover-brand')
      root.style.removeProperty('--focus-primary')
    }
  }, [brandColor])

  return <>{children}</>
}
