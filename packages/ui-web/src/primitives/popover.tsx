import React, { useRef, createContext, useContext } from 'react'
import { useOverlayTriggerState } from 'react-stately'
import { useOverlayTrigger, usePopover, Overlay, DismissButton } from 'react-aria'
import type { AriaPopoverProps } from 'react-aria'
import { cn } from '../utils/cn'

type PopoverPlacement = NonNullable<AriaPopoverProps['placement']>

interface PopoverContextValue {
  state: ReturnType<typeof useOverlayTriggerState>
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

export interface PopoverProps {
  children: React.ReactNode
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export function Popover({ children, ...props }: PopoverProps) {
  const state = useOverlayTriggerState(props)
  const triggerRef = useRef<HTMLButtonElement>(null)
  
  return (
    <PopoverContext.Provider value={{ state, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  )
}

export function PopoverTrigger({ children }: { children: React.ReactElement }) {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('PopoverTrigger must be used within a Popover')
  }
  const { state, triggerRef } = context
  const { triggerProps } = useOverlayTrigger({ type: 'dialog' }, state, triggerRef)

  // useOverlayTrigger only returns ARIA attributes; we still need to wire up
  // the toggle behavior on click and Enter/Space ourselves.
  type TriggerChildProps = {
    onClick?: (e: React.MouseEvent) => void
    ref?: React.Ref<HTMLButtonElement>
  }
  const child = children as React.ReactElement<TriggerChildProps>
  const existingOnClick = child.props?.onClick

  return React.cloneElement(child, {
    ...triggerProps,
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      existingOnClick?.(e)
      state.toggle()
    },
  } as Partial<TriggerChildProps>)
}

export interface PopoverContentProps {
  children: React.ReactNode
  className?: string
  placement?: PopoverPlacement
}

export function PopoverContent({ children, className, placement = 'bottom start', ...props }: PopoverContentProps) {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('PopoverContent must be used within a Popover')
  }
  const { state, triggerRef } = context
  const popoverRef = useRef<HTMLDivElement>(null)

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      triggerRef,
      popoverRef,
      placement,
    },
    state
  )

  if (!state.isOpen) return null

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0 z-50 bg-transparent" />
      <div
        ref={popoverRef}
        {...popoverProps}
        className={cn(
          'z-50 w-72 rounded-xl bg-surface p-4 shadow-lg ring-1 ring-border focus:outline-hidden',
          className
        )}
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  )
}
