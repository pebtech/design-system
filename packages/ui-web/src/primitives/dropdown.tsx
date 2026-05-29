import React, {
  forwardRef,
  createContext,
  useContext,
  useRef,
  useEffect,
} from 'react'
import { useMenuTriggerState } from 'react-stately'
import {
  useMenuTrigger,
  usePopover,
  useInteractOutside,
  Overlay,
  DismissButton,
  FocusScope,
} from 'react-aria'
import type { AriaPopoverProps } from 'react-aria'
import { cn } from '../utils/cn'
import { Button } from './button'

// ─── Types ────────────────────────────────────────────────────
type DropdownPlacement = NonNullable<AriaPopoverProps['placement']>

// ─── Context ──────────────────────────────────────────────────
interface DropdownContextValue {
  state: ReturnType<typeof useMenuTriggerState>
  triggerRef: React.RefObject<HTMLButtonElement | null>
  menuTriggerProps: ReturnType<typeof useMenuTrigger>['menuTriggerProps']
  menuProps: ReturnType<typeof useMenuTrigger>['menuProps']
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

function useDropdownContext(): DropdownContextValue {
  const ctx = useContext(DropdownContext)
  if (!ctx) {
    throw new Error('Dropdown compound components must be used within a Dropdown')
  }
  return ctx
}

// ─── Dropdown (root wrapper) ──────────────────────────────────
export function Dropdown({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const state = useMenuTriggerState({})
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef)

  return (
    <DropdownContext.Provider value={{ state, triggerRef, menuTriggerProps, menuProps }}>
      <div {...props} className={cn('relative inline-block', props.className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

// ─── DropdownButton (trigger) ─────────────────────────────────
export const DropdownButton = forwardRef(function DropdownButton(
  {
    as: Component = Button,
    className,
    onClick,
    ...props
  }: { as?: React.ElementType; className?: string; onClick?: (e: React.MouseEvent) => void; [key: string]: any },
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { state, triggerRef, menuTriggerProps } = useDropdownContext()

  const handleRef = (node: HTMLButtonElement | null) => {
    triggerRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
  }

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e)
    if (state.isOpen) state.close()
    else state.open()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      state.open('first')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      state.open('last')
    }
  }

  // If the rendered component is neither our Button nor a native <button>,
  // we still need to expose it as a focusable trigger to keyboard users and
  // assistive tech. Spread the fallback role/tabIndex BEFORE ...props so
  // consumers can override.
  const isNativeButton = Component === Button || Component === 'button'
  const fallbackButtonProps: { role?: string; tabIndex?: number } = isNativeButton
    ? {}
    : { role: 'button', tabIndex: 0 }

  return (
    <Component
      ref={handleRef}
      type="button"
      aria-haspopup="menu"
      aria-expanded={state.isOpen}
      aria-controls={state.isOpen ? menuTriggerProps['aria-controls'] : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn('font-normal', className)}
      {...(Component === Button ? { preset: 'outline' } : {})}
      {...fallbackButtonProps}
      {...props}
    />
  )
})

// ─── DropdownMenu ─────────────────────────────────────────────
export function DropdownMenu({
  anchor = 'bottom start',
  className,
  children,
  ...props
}: {
  anchor?: DropdownPlacement
  className?: string
  children: React.ReactNode
  [key: string]: any
}) {
  const { state, triggerRef, menuProps } = useDropdownContext()
  const popoverRef = useRef<HTMLDivElement>(null)

  const { popoverProps, underlayProps } = usePopover(
    {
      triggerRef,
      popoverRef,
      placement: anchor,
      offset: 8,
      isNonModal: true,
    },
    state
  )

  useInteractOutside({
    ref: popoverRef,
    isDisabled: !state.isOpen,
    onInteractOutside: (e) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      state.close()
    },
  })

  if (!state.isOpen) return null

  return (
    <Overlay>
      <div
        {...underlayProps}
        className="fixed inset-0 z-40"
        onPointerDown={(e) => {
          underlayProps.onPointerDown?.(e)
          state.close()
        }}
      />
      <FocusScope restoreFocus>
        <div
          ref={popoverRef}
          {...popoverProps}
          className="z-50"
          style={popoverProps.style}
        >
          <DismissButton onDismiss={state.close} />
          <DropdownMenuContent
            menuProps={menuProps}
            className={className}
            onClose={state.close}
            {...props}
          >
            {children}
          </DropdownMenuContent>
          <DismissButton onDismiss={state.close} />
        </div>
      </FocusScope>
    </Overlay>
  )
}

function DropdownMenuContent({
  menuProps,
  className,
  children,
  onClose,
  ...props
}: {
  menuProps: ReturnType<typeof useMenuTrigger>['menuProps']
  className?: string
  children: React.ReactNode
  onClose: () => void
  [key: string]: any
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  // react-aria's menuProps include collection-specific options (autoFocus as a
  // FocusStrategy string, onAction, etc.) that aren't valid HTML attributes.
  // Pick only the ARIA / DOM props we want to forward to the rendered <div>.
  const {
    id,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  } = menuProps as {
    id?: string
    role?: string
    'aria-label'?: string
    'aria-labelledby'?: string
  }

  // Menu remounts each time it opens (we return null when closed), so this
  // mount-only effect correctly focuses the first item on every open.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const items = menuRef.current?.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])'
    )
    items?.[0]?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!menuRef.current) return
    const items = Array.from(
      menuRef.current.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      )
    )
    if (items.length === 0) return

    const currentIndex = items.findIndex((item) => item === document.activeElement)

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        items[next]?.focus()
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1
        items[prev]?.focus()
        break
      }
      case 'Home': {
        e.preventDefault()
        items[0]?.focus()
        break
      }
      case 'End': {
        e.preventDefault()
        items[items.length - 1]?.focus()
        break
      }
      case 'Escape': {
        e.preventDefault()
        onClose()
        break
      }
    }
  }

  return (
    <div
      ref={menuRef}
      id={id}
      role={role ?? 'menu'}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        'isolate max-h-80 min-w-44 w-max overflow-y-auto rounded-xl p-1',
        'outline outline-transparent focus:outline-hidden',
        'bg-surface shadow-xl ring-1 ring-border/50',
        'animate-in fade-in slide-in-from-top-1 duration-100'
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── DropdownItem ─────────────────────────────────────────────
export const DropdownItem = forwardRef(function DropdownItem(
  {
    className,
    href,
    disabled,
    onClick,
    children,
    ...props
  }: {
    className?: string
    href?: string
    disabled?: boolean
    onClick?: (e: React.MouseEvent) => void
    children?: React.ReactNode
    [key: string]: any
  },
  ref: React.ForwardedRef<HTMLElement>
) {
  const { state } = useDropdownContext()

  const classes = cn(
    className,
    'group flex w-full items-center gap-2 cursor-pointer rounded-lg px-3.5 py-2.5 focus:outline-hidden sm:px-3 sm:py-1.5',
    'text-left text-base/6 text-primary sm:text-sm/6',
    'focus:bg-hover-primary focus:text-primary',
    'hover:bg-hover-primary',
    disabled && 'opacity-50 cursor-default',
    'forced-color-adjust-none',
    '*:data-[slot=icon]:mr-2 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 sm:*:data-[slot=icon]:mr-1.5 sm:*:data-[slot=icon]:size-3.5',
    '*:data-[slot=icon]:text-muted focus:*:data-[slot=icon]:text-primary dark:*:data-[slot=icon]:text-muted dark:focus:*:data-[slot=icon]:text-white',
    '*:data-[slot=avatar]:mr-2.5 *:data-[slot=avatar]:-ml-1 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:mr-2 sm:*:data-[slot=avatar]:size-5'
  )

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return
    onClick?.(e)
    state.close()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (disabled) return
      onClick?.(e as any)
      state.close()
    }
  }

  if (typeof href === 'string') {
    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        role="menuitem"
        aria-disabled={disabled || undefined}
        className={classes}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      type="button"
      role="menuitem"
      aria-disabled={disabled || undefined}
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      {...props}
    >
      {children}
    </button>
  )
})

// ─── DropdownHeader ───────────────────────────────────────────
export function DropdownHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={cn(className, 'px-2.5 pb-1 pt-2 text-sm font-medium text-primary sm:px-2')}
    />
  )
}

// ─── DropdownSection ──────────────────────────────────────────
export function DropdownSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      role="group"
      {...props}
      className={cn(
        className,
        'flex flex-col gap-0.5 py-0.5',
        '[&+&]:mt-1 [&+&]:border-t [&+&]:border-border [&+&]:pt-1.5',
      )}
    />
  )
}

// ─── DropdownHeading ──────────────────────────────────────────
export function DropdownHeading({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      role="presentation"
      {...props}
      className={cn(
        className,
        'px-2.5 pb-1 pt-1.5 text-xs font-semibold uppercase tracking-wide text-tertiary sm:px-2',
      )}
    />
  )
}

// ─── DropdownDivider ──────────────────────────────────────────
export function DropdownDivider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      role="separator"
      {...props}
      className={cn(className, 'my-1 h-px bg-border')}
    />
  )
}

// ─── DropdownLabel ────────────────────────────────────────────
export function DropdownLabel({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props} data-slot="label" className={cn(className, 'min-w-0 flex-1 truncate')} />
  )
}

// ─── DropdownDescription ──────────────────────────────────────
export function DropdownDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      data-slot="description"
      {...props}
      className={cn(
        className,
        'mt-0.5 text-xs/4 text-muted group-focus:text-secondary',
      )}
    />
  )
}

// ─── DropdownShortcut ─────────────────────────────────────────
export function DropdownShortcut({
  keys,
  className,
  ...props
}: { keys: string | string[]; className?: string } & React.ComponentPropsWithoutRef<'kbd'>) {
  return (
    <kbd
      {...props}
      className={cn(className, 'ml-auto flex shrink-0 justify-end')}
    >
      {(Array.isArray(keys) ? keys : keys.split('')).map((char, index) => (
        <kbd
          key={index}
          className={cn(
            'min-w-[2ch] text-center font-sans text-muted capitalize group-focus:text-primary forced-colors:group-focus:text-[HighlightText]',
            index > 0 && char.length > 1 && 'pl-1'
          )}
        >
          {char}
        </kbd>
      ))}
    </kbd>
  )
}
