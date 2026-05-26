import React, { forwardRef } from 'react'
import { cn } from '../utils/cn'

type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type ButtonGroupProps = React.ComponentPropsWithoutRef<'div'> & {
  size?: SizeVariant
}

const styles = {
  base: 'inline-flex isolate -space-x-px whitespace-nowrap pointer-fine:cursor-pointer pointer-fine:touch-none',
  radius: {
    xs: {
      start:
        '[&>*:first-child]:!rounded-s-md [&>*:first-child]:before:!rounded-s-[calc(var(--radius-md)-1px)] [&>*:first-child]:after:!rounded-s-[calc(var(--radius-md)-1px)] [&>div:first-child>button]:!rounded-s-md [&>div:first-child>button]:before:!rounded-s-[calc(var(--radius-md)-1px)] [&>div:first-child>button]:after:!rounded-s-[calc(var(--radius-md)-1px)]',
      end: '[&>*:last-child]:!rounded-e-md [&>*:last-child]:before:!rounded-e-[calc(var(--radius-md)-1px)] [&>*:last-child]:after:!rounded-e-[calc(var(--radius-md)-1px)] [&>div:last-child>button]:!rounded-e-md [&>div:last-child>button]:before:!rounded-e-[calc(var(--radius-md)-1px)] [&>div:last-child>button]:after:!rounded-e-[calc(var(--radius-md)-1px)]',
    },
    sm: {
      start:
        '[&>*:first-child]:!rounded-s-md [&>*:first-child]:before:!rounded-s-[calc(var(--radius-md)-1px)] [&>*:first-child]:after:!rounded-s-[calc(var(--radius-md)-1px)] [&>div:first-child>button]:!rounded-s-md [&>div:first-child>button]:before:!rounded-s-[calc(var(--radius-md)-1px)] [&>div:first-child>button]:after:!rounded-s-[calc(var(--radius-md)-1px)]',
      end: '[&>*:last-child]:!rounded-e-md [&>*:last-child]:before:!rounded-e-[calc(var(--radius-md)-1px)] [&>*:last-child]:after:!rounded-e-[calc(var(--radius-md)-1px)] [&>div:last-child>button]:!rounded-e-md [&>div:last-child>button]:before:!rounded-e-[calc(var(--radius-md)-1px)] [&>div:last-child>button]:after:!rounded-e-[calc(var(--radius-md)-1px)]',
    },
    md: {
      start:
        '[&>*:first-child]:!rounded-s-lg [&>*:first-child]:before:!rounded-s-[calc(var(--radius-lg)-1px)] [&>*:first-child]:after:!rounded-s-[calc(var(--radius-lg)-1px)] [&>div:first-child>button]:!rounded-s-lg [&>div:first-child>button]:before:!rounded-s-[calc(var(--radius-lg)-1px)] [&>div:first-child>button]:after:!rounded-s-[calc(var(--radius-lg)-1px)]',
      end: '[&>*:last-child]:!rounded-e-lg [&>*:last-child]:before:!rounded-e-[calc(var(--radius-lg)-1px)] [&>*:last-child]:after:!rounded-e-[calc(var(--radius-lg)-1px)] [&>div:last-child>button]:!rounded-e-lg [&>div:last-child>button]:before:!rounded-e-[calc(var(--radius-lg)-1px)] [&>div:last-child>button]:after:!rounded-e-[calc(var(--radius-lg)-1px)]',
    },
    lg: {
      start:
        '[&>*:first-child]:!rounded-s-lg [&>*:first-child]:before:!rounded-s-[calc(var(--radius-lg)-1px)] [&>*:first-child]:after:!rounded-s-[calc(var(--radius-lg)-1px)] [&>div:first-child>button]:!rounded-s-lg [&>div:first-child>button]:before:!rounded-s-[calc(var(--radius-lg)-1px)] [&>div:first-child>button]:after:!rounded-s-[calc(var(--radius-lg)-1px)]',
      end: '[&>*:last-child]:!rounded-e-lg [&>*:last-child]:before:!rounded-e-[calc(var(--radius-lg)-1px)] [&>*:last-child]:after:!rounded-e-[calc(var(--radius-lg)-1px)] [&>div:last-child>button]:!rounded-e-lg [&>div:last-child>button]:before:!rounded-e-[calc(var(--radius-lg)-1px)] [&>div:last-child>button]:after:!rounded-e-[calc(var(--radius-lg)-1px)]',
    },
    xl: {
      start:
        '[&>*:first-child]:!rounded-s-xl [&>*:first-child]:before:!rounded-s-[calc(var(--radius-xl)-1px)] [&>*:first-child]:after:!rounded-s-[calc(var(--radius-xl)-1px)] [&>div:first-child>button]:!rounded-s-xl [&>div:first-child>button]:before:!rounded-s-[calc(var(--radius-xl)-1px)] [&>div:first-child>button]:after:!rounded-s-[calc(var(--radius-xl)-1px)]',
      end: '[&>*:last-child]:!rounded-e-xl [&>*:last-child]:before:!rounded-e-[calc(var(--radius-xl)-1px)] [&>*:last-child]:after:!rounded-e-[calc(var(--radius-xl)-1px)] [&>div:last-child>button]:!rounded-e-xl [&>div:last-child>button]:before:!rounded-e-[calc(var(--radius-xl)-1px)] [&>div:last-child>button]:after:!rounded-e-[calc(var(--radius-xl)-1px)]',
    },
  },
  reset: [
    '[&>*]:!rounded-none [&>*]:before:!rounded-none [&>*]:after:!rounded-none',
    '[&>div>button]:!rounded-none [&>div>button]:before:!rounded-none [&>div>button]:after:!rounded-none',
  ].join(' '),
  focus: ['[&>*:focus]:z-10', '[&>div>button:focus]:z-10'].join(' '),
}

export const ButtonGroup = forwardRef(function ButtonGroup(
  { className, size = 'md', children, ...props }: ButtonGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const radius = styles.radius[size]

  const classes = cn(styles.base, styles.reset, styles.focus, radius.start, radius.end, className)

  return (
    <div {...props} className={classes} ref={ref}>
      {children}
    </div>
  )
})
