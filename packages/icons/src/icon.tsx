import * as React from 'react'
import type { IconProps } from './types'

/**
 * Rendering modes:
 *   0 — solid: apply `fill: color`
 *   1 — outline: apply `stroke: color, fill: 'none', strokeWidth`
 *   2 — as-is: don't override fill/stroke; just set the CSS `color` so any
 *              `currentColor` inside the body resolves to the requested color.
 *              Used for icon sets (Solar, Iconify) that bake their own
 *              fill/stroke + opacity rules into the SVG body.
 */
export type IconMode = 0 | 1 | 2

/**
 * Shared web icon wrapper. Holds all the `<svg>` boilerplate (size, color,
 * fill/stroke variant, accessibility props, ref forwarding) so each generated
 * icon module only ships its viewBox + path data.
 *
 * Pulled into a single chunk by tsup `splitting: true` — paid once per
 * consumer bundle regardless of how many icons they import.
 */
const SvgIcon = React.forwardRef<
  SVGSVGElement,
  Omit<IconProps, 'mode'> & { viewBox: string; iconMode: IconMode; children: React.ReactNode }
>(function SvgIcon(
  {
    viewBox,
    iconMode,
    size = 24,
    color = 'currentColor',
    strokeWidth = 1.5,
    className,
    title,
    children,
    style,
    ...rest
  },
  ref,
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      {...(iconMode === 1
        ? { stroke: color, fill: 'none', strokeWidth }
        : iconMode === 0
          ? { fill: color }
          : { style: { color, ...style } })}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
})

/**
 * Factory used by every generated icon module. Lifts the `forwardRef` +
 * `displayName` boilerplate out of per-icon files so each one minifies to
 * roughly `createIcon('0 0 24 24', 1, <path d="..."/>)` — ~30 bytes gzipped
 * per icon over the shared chunk.
 */
export function createIcon(
  viewBox: string,
  mode: IconMode,
  body: React.ReactNode,
  displayName: string,
) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox={viewBox} iconMode={mode} {...props}>
        {body}
      </SvgIcon>
    )
  })
  Icon.displayName = displayName
  return Icon
}

export default SvgIcon
