import React, { createContext, useContext, useId, useState } from 'react'
import { cn } from '../utils/cn'

interface CollapsibleContextValue {
  isOpen: boolean
  toggle: () => void
  contentId: string
}

const CollapsibleContext = createContext<CollapsibleContextValue>({
  isOpen: false,
  toggle: () => {},
  contentId: '',
})

function useCollapsible() {
  return useContext(CollapsibleContext)
}

// --- Collapsible ---

interface CollapsibleProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

export function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const contentId = useId()

  const toggle = () => {
    const next = !isOpen
    if (!isControlled) {
      setInternalOpen(next)
    }
    onOpenChange?.(next)
  }

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle, contentId }}>
      <div className={cn(className)}>{children}</div>
    </CollapsibleContext.Provider>
  )
}

// --- CollapsibleTrigger ---

interface CollapsibleTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export function CollapsibleTrigger({
  children,
  className,
}: CollapsibleTriggerProps) {
  const { isOpen, toggle, contentId } = useCollapsible()

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={contentId}
      onClick={toggle}
      className={cn('cursor-pointer', className)}
    >
      {children}
    </button>
  )
}

// --- CollapsibleContent ---

interface CollapsibleContentProps {
  children: React.ReactNode
  className?: string
}

export function CollapsibleContent({
  children,
  className,
}: CollapsibleContentProps) {
  const { isOpen, contentId } = useCollapsible()

  return (
    <div
      id={contentId}
      role="region"
      className={cn(
        'grid transition-all duration-300 ease-in-out',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
    >
      <div className={cn('overflow-hidden', className)}>{children}</div>
    </div>
  )
}
