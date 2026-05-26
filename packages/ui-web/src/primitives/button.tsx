import React, { forwardRef, useRef } from 'react'
import { useButton, useFocusRing, useHover, useLink } from 'react-aria'
import { Link } from '../typography/link'
import { cn } from '../utils/cn'
import { TouchTarget } from '../utils/touch-target'

// Variant types
type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type StateVariant = 'default' | 'loading' | 'disabled' | 'active'
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

// Button variant configuration
type ButtonVariants = {
  size?: SizeVariant
  variant?: ButtonVariant
  state?: StateVariant
}

// Preset configurations for common button combinations
const buttonPresets = {
  default: { size: 'md', variant: 'primary', state: 'default' } as const,
  secondary: { size: 'md', variant: 'secondary', state: 'default' } as const,
  ghost: { size: 'md', variant: 'ghost', state: 'default' } as const,
  outline: { size: 'md', variant: 'outline', state: 'default' } as const,
  destructive: { size: 'md', variant: 'destructive', state: 'default' } as const,
} as const

type ButtonPreset = keyof typeof buttonPresets

// Size variant definitions
const sizeVariants: Record<SizeVariant, string> = {
  xs: 'px-2 py-1.5 text-xs/4 gap-x-1 rounded-md',
  sm: 'px-2.5 py-1.5 text-sm/5 gap-x-1.5 rounded-md',
  md: 'px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6 gap-x-2 rounded-lg',
  lg: 'px-4 py-3 text-base/6 gap-x-2 rounded-lg',
  xl: 'px-6 py-4 text-lg/7 gap-x-3 rounded-xl',
}

// State variant definitions
const stateVariants: Record<StateVariant, string> = {
  default: '',
  loading: 'cursor-wait',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  active: 'scale-95 transition-transform duration-75',
}

const styles = {
  base: [
    // Base
    'relative cursor-pointer isolate -my-0.5 inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold transition-all duration-200',
    // Focus
    'focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-brand',
    // Icon base styles (will be overridden by size variants)
    '*:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]',
  ],
  // Icon size adjustments for each size variant
  iconSizes: {
    xs: '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0 *:data-[slot=icon]:size-3',
    sm: '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-4',
    md: '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4',
    lg: '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5',
    xl: '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-6',
  },


  // Button variant styles
  variants: {
    primary: [
      // Optical border, implemented as the button background to avoid corner artifacts
      'border-transparent bg-(--btn-border)',
      // Button background, implemented as foreground layer to stack on top of pseudo-border layer
      'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg)',
      // Drop shadow, applied to the inset `before` layer so it blends with the border
      'before:shadow-sm',
      // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
      'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)]',
      // Inner highlight shadow
      'after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
      // White overlay on hover
      'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
      // Disabled
      'data-disabled:before:shadow-none data-disabled:after:shadow-none',
      // Default color scheme matching button.tsx dark/indigo
      'text-white [--btn-bg:var(--bg-brand)] [--btn-border:var(--border-brand)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      '[--btn-icon:var(--color-white)]/80 data-active:[--btn-icon:var(--color-white)] data-hover:[--btn-icon:var(--color-white)]',
    ],
    // Secondary variant - matches plain variant from button.tsx
    secondary: [
      'border-transparent bg-quaternaryBg text-neutral-900 data-active:bg-quaternaryBg/80 data-hover:bg-quaternaryBg/80',
      // Shadows
      '[--btn-icon:var(--text-secondary)] data-active:[--btn-icon:var(--text-primary)] data-hover:[--btn-icon:var(--text-primary)]',
    ],
    // Outline variant - matches outline variant from button.tsx
    outline: [
      'border-border text-primary data-active:bg-secondary/2.5 data-hover:bg-secondary/2.5',
      '[--btn-icon:var(--text-secondary)] data-active:[--btn-icon:var(--text-primary)] data-hover:[--btn-icon:var(--text-primary)]',
    ],
    // Ghost variant - matches plain variant from button.tsx
    ghost: [
      'border-transparent text-primary data-active:bg-secondary/5 data-hover:bg-secondary/5',
      '[--btn-icon:var(--text-secondary)] data-active:[--btn-icon:var(--text-primary)] data-hover:[--btn-icon:var(--text-primary)]',
    ],
    // Destructive variant - matches plain variant structure from button.tsx but keeps red styling
    destructive: [
      'border-transparent text-white bg-red-600',
      'data-active:bg-red-700 data-hover:bg-red-700',
      '[--btn-icon:var(--color-red-200)] data-active:[--btn-icon:var(--color-red-100)] data-hover:[--btn-icon:var(--color-red-100)]',
      'shadow-sm data-active:shadow-none',
    ],
  },
  colors: {
    'dark/indigo': [
      'text-white [--btn-bg:var(--color-indigo-900)] [--btn-border:var(--color-indigo-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      'dark:text-white dark:[--btn-bg:var(--color-indigo-600)] dark:[--btn-hover-overlay:var(--color-white)]/5',
      '[--btn-icon:var(--color-indigo-400)] data-active:[--btn-icon:var(--color-indigo-300)] data-hover:[--btn-icon:var(--color-indigo-300)]',
    ],
    light: [
      'text-neutral-900 [--btn-bg:white] [--btn-border:var(--color-primary)]/10 [--btn-hover-overlay:var(--color-primary)]/2.5 data-active:[--btn-border:var(--color-primary)]/15 data-hover:[--btn-border:var(--color-primary)]/15',
      'dark:text-white dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--bg-secondary)]',
      '[--btn-icon:var(--text-secondary)] data-active:[--btn-icon:var(--text-primary)] data-hover:[--btn-icon:var(--text-primary)]',
    ],
    'dark/white': [
      'text-white [--btn-bg:var(--color-slate-900)] [--btn-border:var(--color-slate-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      '[--btn-icon:var(--color-slate-400)] data-active:[--btn-icon:var(--color-slate-300)] data-hover:[--btn-icon:var(--color-slate-300)]',
    ],
    brand: [
      'text-brand [--btn-bg:var(--color-brand)] [--btn-border:var(--color-brand)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      '[--btn-icon:var(--color-brand)]/60 data-active:[--btn-icon:var(--color-brand)]/80 data-hover:[--btn-icon:var(--color-brand)]/80',
    ],
    dark: [
      'text-white [--btn-bg:var(--bg-inverse)] [--btn-border:var(--color-black)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      'dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--bg-secondary)]',
      '[--btn-icon:var(--text-secondary)] data-active:[--btn-icon:var(--text-primary)] data-hover:[--btn-icon:var(--text-primary)]',
    ],
    white: [
      'text-neutral-900 [--btn-bg:white] [--btn-border:var(--color-primary)]/10 [--btn-hover-overlay:var(--color-primary)]/2.5 data-active:[--btn-border:var(--color-primary)]/15 data-hover:[--btn-border:var(--color-primary)]/15',
      '[--btn-icon:var(--text-secondary)] data-active:[--btn-icon:var(--text-tertiary)] data-hover:[--btn-icon:var(--text-tertiary)]',
    ],
    slate: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-secondary)] [--btn-border:var(--color-tertiary)]/90',
      '[--btn-icon:var(--text-secondary)] data-active:[--btn-icon:var(--text-primary)] data-hover:[--btn-icon:var(--text-primary)]',
    ],
    indigo: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-indigo-500)] [--btn-border:var(--color-indigo-600)]/90',
      '[--btn-icon:var(--color-indigo-300)] data-active:[--btn-icon:var(--color-indigo-200)] data-hover:[--btn-icon:var(--color-indigo-200)]',
    ],
    cyan: [
      'text-cyan-950 [--btn-bg:var(--color-cyan-300)] [--btn-border:var(--color-cyan-400)]/80 [--btn-hover-overlay:var(--color-white)]/25',
      '[--btn-icon:var(--color-cyan-500)]',
    ],
    red: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-red-600)] [--btn-border:var(--color-red-700)]/90',
      '[--btn-icon:var(--color-red-300)] data-active:[--btn-icon:var(--color-red-200)] data-hover:[--btn-icon:var(--color-red-200)]',
    ],
    orange: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-orange-500)] [--btn-border:var(--color-orange-600)]/90',
      '[--btn-icon:var(--color-orange-300)] data-active:[--btn-icon:var(--color-orange-200)] data-hover:[--btn-icon:var(--color-orange-200)]',
    ],
    amber: [
      'text-amber-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-amber-400)] [--btn-border:var(--color-amber-500)]/80',
      '[--btn-icon:var(--color-amber-600)]',
    ],
    yellow: [
      'text-yellow-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-yellow-300)] [--btn-border:var(--color-yellow-400)]/80',
      '[--btn-icon:var(--color-yellow-600)] data-active:[--btn-icon:var(--color-yellow-700)] data-hover:[--btn-icon:var(--color-yellow-700)]',
    ],
    lime: [
      'text-lime-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-lime-300)] [--btn-border:var(--color-lime-400)]/80',
      '[--btn-icon:var(--color-lime-600)] data-active:[--btn-icon:var(--color-lime-700)] data-hover:[--btn-icon:var(--color-lime-700)]',
    ],
    green: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-green-600)] [--btn-border:var(--color-green-700)]/90',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    emerald: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-emerald-600)] [--btn-border:var(--color-emerald-700)]/90',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    teal: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-teal-600)] [--btn-border:var(--color-teal-700)]/90',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    sky: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-sky-500)] [--btn-border:var(--color-sky-600)]/80',
      '[--btn-icon:var(--color-white)]/60 data-active:[--btn-icon:var(--color-white)]/80 data-hover:[--btn-icon:var(--color-white)]/80',
    ],
    blue: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-blue-600)] [--btn-border:var(--color-blue-700)]/90',
      '[--btn-icon:var(--color-blue-400)] data-active:[--btn-icon:var(--color-blue-300)] data-hover:[--btn-icon:var(--color-blue-300)]',
    ],
    violet: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-violet-500)] [--btn-border:var(--color-violet-600)]/90',
      '[--btn-icon:var(--color-violet-300)] data-active:[--btn-icon:var(--color-violet-200)] data-hover:[--btn-icon:var(--color-violet-200)]',
    ],
    purple: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-purple-500)] [--btn-border:var(--color-purple-600)]/90',
      '[--btn-icon:var(--color-purple-300)] data-active:[--btn-icon:var(--color-purple-200)] data-hover:[--btn-icon:var(--color-purple-200)]',
    ],
    fuchsia: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-fuchsia-500)] [--btn-border:var(--color-fuchsia-600)]/90',
      '[--btn-icon:var(--color-fuchsia-300)] data-active:[--btn-icon:var(--color-fuchsia-200)] data-hover:[--btn-icon:var(--color-fuchsia-200)]',
    ],
    pink: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-pink-500)] [--btn-border:var(--color-pink-600)]/90',
      '[--btn-icon:var(--color-pink-300)] data-active:[--btn-icon:var(--color-pink-200)] data-hover:[--btn-icon:var(--color-pink-200)]',
    ],
    rose: [
      'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-rose-500)] [--btn-border:var(--color-rose-600)]/90',
      '[--btn-icon:var(--color-rose-300)] data-active:[--btn-icon:var(--color-rose-200)] data-hover:[--btn-icon:var(--color-rose-200)]',
    ],
  },
}

type ButtonProps = {
  variants?: ButtonVariants
  preset?: ButtonPreset
  color?: keyof typeof styles.colors
  className?: string
  children: React.ReactNode
} & (
    | ({ href?: never } & Omit<React.ComponentPropsWithoutRef<'button'>, 'className'>)
    | ({ href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>)
  )

export const Button = forwardRef(function Button(
  { color, className, children, variants, preset, ...props }: ButtonProps,
  forwardedRef: React.ForwardedRef<HTMLElement>
) {
  const localRef = useRef<HTMLElement>(null)

  const setRef = React.useCallback((node: HTMLElement | null) => {
    (localRef as any).current = node
    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
      } else {
        (forwardedRef as any).current = node
      }
    }
  }, [forwardedRef])

  // Determine the final variants to use
  const baseVariants = preset ? buttonPresets[preset] : buttonPresets.default

  const resolvedVariants = {
    size: variants?.size || baseVariants.size,
    variant: variants?.variant || baseVariants.variant,
    state: variants?.state || baseVariants.state,
  }

  // Determine disabled state
  const isDisabled = ('disabled' in props && props.disabled) || resolvedVariants.state === 'disabled'
  const isLink = typeof props.href === 'string'

  const linkResult = useLink({ ...(props as any), isDisabled }, localRef)
  const buttonResult = useButton(
    {
      ...(props as any),
      isDisabled,
      elementType: 'button',
    },
    localRef as any
  )

  const buttonProps = isLink ? linkResult.linkProps : buttonResult.buttonProps
  const isPressed = isLink ? (linkResult as any).isPressed || false : buttonResult.isPressed

  const { focusProps, isFocusVisible } = useFocusRing()
  const { hoverProps, isHovered } = useHover({ isDisabled })

  const classes = cn(
    styles.base,
    sizeVariants[resolvedVariants.size],
    stateVariants[isDisabled ? 'disabled' : resolvedVariants.state],
    styles.iconSizes[resolvedVariants.size],
    styles.variants[resolvedVariants.variant],
    color && styles.colors[color],
    className
  )

  const customStates = {
    'data-active': isPressed ? '' : undefined,
    'data-hover': isHovered ? '' : undefined,
    'data-focus': isFocusVisible ? '' : undefined,
    'data-disabled': isDisabled ? '' : undefined,
  }

  return isLink ? (
    <Link
      {...(props as any)}
      {...buttonProps}
      {...focusProps}
      {...hoverProps}
      {...customStates}
      className={classes}
      ref={setRef as React.ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <button
      {...(props as any)}
      {...buttonProps}
      {...focusProps}
      {...hoverProps}
      {...customStates}
      className={classes}
      ref={setRef as React.ForwardedRef<HTMLButtonElement>}
    >
      <TouchTarget>{children}</TouchTarget>
    </button>
  )
})


