import { cn } from '../utils/cn'

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>

const sizes = {
  1: 'text-2xl/8 sm:text-xl/8',
  2: 'text-xl/8 sm:text-lg/6',
  3: 'text-lg/8 sm:text-base/7',
  4: 'text-base/7 sm:text-sm/6',
  5: 'text-sm/6 sm:text-xs/5',
  6: 'text-xs/5',
}

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={cn(className, sizes[level], 'font-semibold text-primary')}
    />
  )
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={cn(
        className,
        sizes[level],
        'font-semibold text-primary'
      )}
    />
  )
}
