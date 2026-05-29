import clsx from 'clsx'
import { forwardRef } from 'react'
import { Link } from '../typography/link'
import { cn } from '../utils/cn'

export type PageBackButtonAppearance =
  | 'text'
  | 'ghost'
  | 'outline'
  | 'pill'
  | 'minimal'
  | 'emphasis'

export type PageBackButtonSize = 'sm' | 'md'

const sizeStyles: Record<PageBackButtonSize, string> = {
  sm: 'gap-1.5 text-xs/5 [&_[data-slot=icon]]:size-3.5',
  md: 'gap-2 text-sm/6 [&_[data-slot=icon]]:size-4',
}

const appearanceStyles: Record<PageBackButtonAppearance, string> = {
  text: [
    'text-secondary',
    'hover:text-primary',
    'active:scale-[0.98]',
    '[&_[data-slot=icon]]:text-tertiary hover:[&_[data-slot=icon]]:text-secondary',
  ],
  ghost: [
    'rounded-lg px-2.5 py-1.5 -ml-2.5',
    'text-secondary',
    'hover:bg-secondary/5 hover:text-primary',
    'active:scale-[0.98]',
    '[&_[data-slot=icon]]:text-tertiary hover:[&_[data-slot=icon]]:text-secondary',
  ],
  outline: [
    'rounded-lg border border-border px-3 py-1.5',
    'text-primary shadow-sm',
    'hover:bg-secondary/5 hover:border-border/80',
    'active:scale-[0.98]',
    '[&_[data-slot=icon]]:text-secondary',
  ],
  pill: [
    'rounded-full bg-secondary/50 px-3 py-1.5',
    'text-primary',
    'hover:bg-secondary/70',
    'active:scale-[0.98]',
    '[&_[data-slot=icon]]:text-secondary',
  ],
  minimal: [
    'gap-1 text-tertiary',
    'underline-offset-4 hover:text-primary hover:underline',
    'active:scale-[0.98]',
    '[&_[data-slot=icon]]:text-quaternary',
  ],
  emphasis: [
    'font-medium text-brand',
    'hover:text-brand/80',
    'active:scale-[0.98]',
    '[&_[data-slot=icon]]:text-brand/70',
  ],
}

const baseStyles = [
  'inline-flex cursor-pointer items-center font-normal transition-all duration-150 ease-out',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
  'disabled:pointer-events-none disabled:opacity-50',
]

type PageBackButtonBaseProps = {
  text: string
  appearance?: PageBackButtonAppearance
  size?: PageBackButtonSize
  /** Show only the chevron; `text` becomes the accessible label. */
  iconOnly?: boolean
  className?: string
  disabled?: boolean
}

export type PageBackButtonProps = PageBackButtonBaseProps &
  (
    | ({ href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href' | 'children'>)
    | ({ href?: never } & Omit<React.ComponentPropsWithoutRef<'button'>, 'children' | 'type'>)
  )

function BackChevron() {
  return (
    <svg
      data-slot="icon"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0 stroke-current"
    >
      <path
        d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const PageBackButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, PageBackButtonProps>(
  function PageBackButton(
    {
      text,
      appearance = 'text',
      size = 'md',
      iconOnly = false,
      className,
      disabled,
      href,
      ...props
    },
    ref,
  ) {
    const classes = cn(
      baseStyles,
      sizeStyles[size],
      appearanceStyles[appearance],
      className,
    )

    const label = iconOnly ? (
      <span className="sr-only">{text}</span>
    ) : (
      <span className={clsx(appearance === 'emphasis' && 'font-medium')}>{text}</span>
    )

    const content = (
      <>
        <BackChevron />
        {label}
      </>
    )

    if (href && !disabled) {
      return (
        <Link
          {...(props as React.ComponentPropsWithoutRef<typeof Link>)}
          href={href}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={classes}
          aria-label={iconOnly ? text : undefined}
        >
          {content}
        </Link>
      )
    }

    return (
      <button
        {...(props as React.ComponentPropsWithoutRef<'button'>)}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        className={classes}
        aria-label={iconOnly ? text : undefined}
      >
        {content}
      </button>
    )
  },
)
