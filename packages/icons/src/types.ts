import type { SVGProps } from 'react'

export type IconProps = {
  size?: number | string
  color?: string
  strokeWidth?: number
  className?: string
  title?: string
} & Omit<SVGProps<SVGSVGElement>, 'color'>
