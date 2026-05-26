import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import { Modal, Pressable, View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any

// --- HoverCard Context ---

interface HoverCardContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  triggerLayout: { x: number; y: number; width: number; height: number }
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void
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
}

export function HoverCard({ children }: HoverCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <HoverCardContext.Provider value={{ isOpen, open, close, triggerLayout, setTriggerLayout }}>
      {children}
    </HoverCardContext.Provider>
  )
}

// --- HoverCardTrigger ---

export interface HoverCardTriggerProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function HoverCardTrigger({ children, className, style }: HoverCardTriggerProps) {
  const { open, setTriggerLayout } = useHoverCardContext()
  const triggerRef = useRef<View>(null)

  const handlePress = useCallback(() => {
    if (triggerRef.current) {
      (triggerRef.current as any).measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setTriggerLayout({ x, y, width, height })
          open()
        }
      )
    }
  }, [open, setTriggerLayout])

  return (
    <TypedPressable
      ref={triggerRef}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityHint="Tap to show more information"
      style={style}
      className={cn(className)}
    >
      {children}
    </TypedPressable>
  )
}

// --- HoverCardContent ---

export interface HoverCardContentProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
  placement?: 'top' | 'bottom'
}

export function HoverCardContent({
  children,
  className,
  style,
  placement = 'bottom',
}: HoverCardContentProps) {
  const { isOpen, close, triggerLayout } = useHoverCardContext()
  const { tokens } = useTheme()

  if (!isOpen) return null

  const cardTop =
    placement === 'top'
      ? triggerLayout.y - 8
      : triggerLayout.y + triggerLayout.height + 8

  return (
    <Modal
      transparent
      visible={isOpen}
      onRequestClose={close}
      animationType="fade"
    >
      <TypedPressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
        onPress={close}
      >
        <TypedPressable
          style={StyleSheet.flatten([
            {
              position: 'absolute',
              top: cardTop,
              left: triggerLayout.x,
              width: Math.max(triggerLayout.width, 280),
              backgroundColor: tokens.bg.surface ?? '#ffffff',
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: tokens.border.primary ?? '#e4e4e7',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 8,
              ...(placement === 'top' ? { transform: [{ translateY: -100 }] } : {}),
            },
            style,
          ])}
          className={cn(className)}
        >
          {children}
        </TypedPressable>
      </TypedPressable>
    </Modal>
  )
}
