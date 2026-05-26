import React, { createContext, useContext, useRef, useCallback, useEffect, useId } from 'react'
import { useOverlayTriggerState } from 'react-stately'
import { usePopover, Overlay, DismissButton } from 'react-aria'
import { cn } from '../utils/cn'

// --- HoverCard Context ---

interface HoverCardContextValue {
  state: ReturnType<typeof useOverlayTriggerState>
  triggerRef: React.RefObject<HTMLElement | null>
  openDelayMs: number
  closeDelayMs: number
  cardId: string
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null)

function useHoverCardContext() {
  const context = useContext(HoverCardContext)
  if (!context) {
    throw new Error('HoverCard compound components must be used within a HoverCard')
  }
  return context
}

// --- HoverCard ---

export interface HoverCardProps {
  children: React.ReactNode
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  openDelay?: number
  closeDelay?: number
}

export function HoverCard({
  children,
  openDelay = 300,
  closeDelay = 200,
  ...props
}: HoverCardProps) {
  const state = useOverlayTriggerState(props)
  const triggerRef = useRef<HTMLElement>(null)
  const cardId = useId()

  return (
    <HoverCardContext.Provider
      value={{ state, triggerRef, openDelayMs: openDelay, closeDelayMs: closeDelay, cardId }}
    >
      {children}
    </HoverCardContext.Provider>
  )
}

// --- HoverCardTrigger ---

export interface HoverCardTriggerProps {
  children: React.ReactElement
  className?: string
}

export function HoverCardTrigger({ children, className }: HoverCardTriggerProps) {
  const { state, triggerRef, openDelayMs, closeDelayMs, cardId } = useHoverCardContext()
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    clearTimers()
    openTimerRef.current = setTimeout(() => {
      state.open()
    }, openDelayMs)
  }, [state, openDelayMs, clearTimers])

  const handleMouseLeave = useCallback(() => {
    clearTimers()
    closeTimerRef.current = setTimeout(() => {
      state.close()
    }, closeDelayMs)
  }, [state, closeDelayMs, clearTimers])

  const handleFocus = useCallback(() => {
    clearTimers()
    state.open()
  }, [state, clearTimers])

  const handleBlur = useCallback(() => {
    clearTimers()
    closeTimerRef.current = setTimeout(() => {
      state.close()
    }, closeDelayMs)
  }, [state, closeDelayMs, clearTimers])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  const childProps = {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    'aria-describedby': state.isOpen ? cardId : undefined,
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, childProps)
  }

  return (
    <span
      {...childProps}
      ref={triggerRef as React.RefObject<HTMLSpanElement>}
      className={className}
    >
      {children}
    </span>
  )
}

// --- HoverCardContent ---

export interface HoverCardContentProps {
  children: React.ReactNode
  className?: string
  placement?: 'bottom' | 'bottom start' | 'bottom end' | 'top' | 'top start' | 'top end'
}

export function HoverCardContent({
  children,
  className,
  placement = 'bottom',
  ...props
}: HoverCardContentProps) {
  const { state, triggerRef, closeDelayMs, cardId } = useHoverCardContext()
  const popoverRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      triggerRef,
      popoverRef,
      placement,
      offset: 8,
    },
    state
  )

  const handleMouseEnter = useCallback(() => {
    // Cancel close timer when hovering over the card
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      state.close()
    }, closeDelayMs)
  }, [state, closeDelayMs])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  if (!state.isOpen) return null

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0 z-50 bg-transparent" />
      <div
        ref={popoverRef}
        {...popoverProps}
        id={cardId}
        role="tooltip"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'z-50 w-80 rounded-xl bg-white p-4 shadow-lg ring-1 ring-zinc-950/10 dark:bg-zinc-900 dark:ring-white/10',
          'outline-none focus:outline-none',
          'animate-in fade-in-0 zoom-in-95',
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
