import type { SVGProps } from 'react'

/**
 * Cross-platform icon props.
 *
 * On the web build this extends `SVGProps<SVGSVGElement>` so consumers can
 * pass any DOM event handler or ARIA attribute.
 *
 * On the React Native build (`@eniolayo/icons/outline` resolved via the
 * `react-native` export condition) the shape is narrower — see
 * `types.native.ts`.
 */
export type IconProps = {
  size?: number | string
  color?: string
  strokeWidth?: number
  className?: string
  title?: string
} & Omit<SVGProps<SVGSVGElement>, 'color'>
