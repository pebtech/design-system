import { cn } from '../utils/cn'

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>

/**
 * Type scale — each level steps down clearly in size and weight.
 * (Previously, `sm:` breakpoints made headings *smaller* on wide screens, so levels looked identical.)
 */
const headingStyles: Record<NonNullable<HeadingProps['level']>, string> = {
  1: 'text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-tight',
  2: 'text-2xl font-bold tracking-tight text-primary sm:text-3xl sm:leading-snug',
  3: 'text-xl font-semibold text-primary sm:text-2xl sm:leading-snug',
  4: 'text-lg font-semibold text-primary sm:text-xl sm:leading-normal',
  5: 'text-base font-semibold text-primary sm:text-lg sm:leading-normal',
  6: 'text-sm font-semibold text-primary sm:text-base sm:leading-normal',
}

const subheadingStyles: Record<NonNullable<HeadingProps['level']>, string> = {
  1: 'text-2xl font-semibold text-secondary sm:text-3xl sm:leading-snug',
  2: 'text-xl font-semibold text-secondary sm:text-2xl sm:leading-snug',
  3: 'text-lg font-medium text-secondary sm:text-xl sm:leading-normal',
  4: 'text-base font-medium text-secondary sm:text-lg sm:leading-normal',
  5: 'text-sm font-medium text-secondary sm:text-base sm:leading-normal',
  6: 'text-sm font-medium text-tertiary sm:text-sm sm:leading-normal',
}

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={cn(headingStyles[level], className)}
    />
  )
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={cn(subheadingStyles[level], className)}
    />
  )
}
