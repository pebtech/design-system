/**
 * Cross-platform icon props (React Native flavor).
 *
 * Resolved by Metro when consumers import `@eniolayo/icons/outline` (or
 * `/solid`) inside Expo / React Native, via the `react-native` export
 * condition in the package manifest.
 *
 * `className` is accepted but no-op unless the consumer wires a className
 * transformer such as NativeWind. `title` is also a no-op on native.
 *
 * Intentionally does not extend `SvgXml` props: when `react-native` is
 * installed, `ComponentProps<typeof SvgXml>` includes View layout props that
 * are not valid on `SvgXml` and break the declaration build.
 */
export type IconProps = {
  size?: number | string
  color?: string
  strokeWidth?: number
  className?: string
  title?: string
}
