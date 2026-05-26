import * as React from 'react'
import { SvgXml } from 'react-native-svg'
import type { IconProps } from './types.native'

/**
 * Rendering modes:
 *   0 — solid: wrap with `<svg fill="${color}">`
 *   1 — outline: wrap with `<svg stroke="${color}" fill="none" stroke-width="${strokeWidth}">`
 *   2 — as-is: render the body inside `<svg>` without overriding fill/stroke.
 *              `react-native-svg`'s SvgXml resolves embedded `currentColor`
 *              via the `color` prop on the host `<Svg>`.
 */
export type IconMode = 0 | 1 | 2

/**
 * Shared native icon wrapper. Builds the inline SVG string from the icon's
 * viewBox + body and forwards size/color/strokeWidth to `react-native-svg`.
 *
 * Pulled into a single chunk by tsup `splitting: true` — paid once per
 * consumer bundle regardless of how many icons they import.
 */
const SvgIconNative = React.forwardRef<
  React.ComponentRef<typeof SvgXml>,
  Omit<IconProps, 'mode'> & { viewBox: string; iconMode: IconMode; body: string }
>(function SvgIconNative(
  {
    viewBox,
    iconMode,
    body,
    size = 24,
    color = 'currentColor',
    strokeWidth = 1.5,
    className: _className,
    title: _title,
    ...rest
  },
  ref,
) {
  const xml = React.useMemo(() => {
    if (iconMode === 1) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`
    }
    if (iconMode === 0) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="${color}">${body}</svg>`
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`
  }, [viewBox, iconMode, body, color, strokeWidth])

  return (
    <SvgXml
      ref={ref}
      xml={xml}
      width={size}
      height={size}
      color={iconMode === 2 ? color : undefined}
      {...rest}
    />
  )
})

/**
 * Factory used by every generated native icon module. Lifts the `forwardRef`
 * + `displayName` boilerplate so each per-icon file is just a `createIcon`
 * call with the viewBox + body string.
 */
export function createIcon(
  viewBox: string,
  mode: IconMode,
  body: string,
  displayName: string,
) {
  const Icon = React.forwardRef<React.ComponentRef<typeof SvgXml>, IconProps>(
    function Icon(props, ref) {
      return (
        <SvgIconNative
          ref={ref}
          viewBox={viewBox}
          iconMode={mode}
          body={body}
          {...props}
        />
      )
    },
  )
  Icon.displayName = displayName
  return Icon
}

export default SvgIconNative
