import React, { useMemo } from 'react'
import { getColorShades } from '@pebtech/tokens'

export function BrandProvider({
  brandColor,
  children,
  className,
}: {
  brandColor: string
  children: React.ReactNode
  className?: string
}) {
  const style = useMemo(() => {
    const shades = getColorShades(brandColor)
    return {
      '--text-brand': shades[500],
      '--text-brandAlt': shades[600],
      '--bg-brand': shades[500],
      '--border-brand': shades[500],
      '--border-focus': shades[500],
      '--hover-brand': shades[600],
      '--focus-primary': shades[500],
    } as React.CSSProperties
  }, [brandColor])

  return (
    <div style={style} className={className}>
      {children}
    </div>
  )
}
