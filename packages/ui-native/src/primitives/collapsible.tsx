import React, { createContext, useContext, useState } from 'react'
import { LayoutAnimation, Pressable, View, ViewStyle } from 'react-native'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any

interface CollapsibleContextValue {
  isOpen: boolean
  toggle: () => void
}

const CollapsibleContext = createContext<CollapsibleContextValue>({
  isOpen: false,
  toggle: () => {},
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
  style?: ViewStyle
}

export function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  style,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    const next = !isOpen
    if (!isControlled) {
      setInternalOpen(next)
    }
    onOpenChange?.(next)
  }

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle }}>
      <TypedView className={cn(className)} style={style}>
        {children}
      </TypedView>
    </CollapsibleContext.Provider>
  )
}

// --- CollapsibleTrigger ---

interface CollapsibleTriggerProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function CollapsibleTrigger({
  children,
  className,
  style,
}: CollapsibleTriggerProps) {
  const { toggle } = useCollapsible()

  return (
    <TypedPressable
      onPress={toggle}
      className={cn(className)}
      style={style}
      accessibilityRole="button"
    >
      {children}
    </TypedPressable>
  )
}

// --- CollapsibleContent ---

interface CollapsibleContentProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function CollapsibleContent({
  children,
  className,
  style,
}: CollapsibleContentProps) {
  const { isOpen } = useCollapsible()

  if (!isOpen) return null

  return (
    <TypedView className={cn(className)} style={style}>
      {children}
    </TypedView>
  )
}
