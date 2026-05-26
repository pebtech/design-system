import React, { createContext, useContext, useState, useRef, useCallback } from 'react'
import { Modal, Pressable, View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any

// --- Tooltip Context ---

interface TooltipContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  triggerLayout: { x: number; y: number; width: number; height: number }
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void
}

const TooltipContext = createContext<TooltipContextValue | null>(null)

function useTooltipContext() {
  const context = useContext(TooltipContext)
  if (!context) {
    throw new Error('Tooltip compound components must be used within a Tooltip')
  }
  return context
}

// --- Tooltip ---

export interface TooltipProps {
  children: React.ReactNode
}

export function Tooltip({ children }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <TooltipContext.Provider value={{ isOpen, open, close, triggerLayout, setTriggerLayout }}>
      {children}
    </TooltipContext.Provider>
  )
}

// --- TooltipTrigger ---

export interface TooltipTriggerProps {
  children: React.ReactElement
  delayLongPress?: number
}

export function TooltipTrigger({ children, delayLongPress = 500 }: TooltipTriggerProps) {
  const { open, setTriggerLayout } = useTooltipContext()
  const triggerRef = useRef<View>(null)

  const handleLongPress = useCallback(() => {
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
      onLongPress={handleLongPress}
      delayLongPress={delayLongPress}
      accessibilityRole="button"
      accessibilityHint="Long press to show tooltip"
    >
      {children}
    </TypedPressable>
  )
}

// --- TooltipContent ---

export interface TooltipContentProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
  placement?: 'top' | 'bottom'
}

export function TooltipContent({
  children,
  className,
  style,
  placement = 'top',
}: TooltipContentProps) {
  const { isOpen, close, triggerLayout } = useTooltipContext()
  const { tokens } = useTheme()

  if (!isOpen) return null

  const tooltipTop =
    placement === 'top'
      ? triggerLayout.y - 40
      : triggerLayout.y + triggerLayout.height + 8

  const tooltipLeft = triggerLayout.x + triggerLayout.width / 2

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
          backgroundColor: 'transparent',
        }}
        onPress={close}
      >
        <TypedView
          style={StyleSheet.flatten([
            {
              position: 'absolute',
              top: tooltipTop,
              left: tooltipLeft,
              transform: [{ translateX: -50 }],
              backgroundColor: tokens.bg.surface ?? '#18181b',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: tokens.border.primary ?? '#3f3f46',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 4,
              maxWidth: 200,
            },
            style,
          ])}
          className={cn(className)}
        >
          {typeof children === 'string' ? (
            <Text
              size="xs"
              style={{ color: tokens.text.primary ?? '#fafafa', textAlign: 'center' }}
            >
              {children}
            </Text>
          ) : (
            children
          )}
        </TypedView>
      </TypedPressable>
    </Modal>
  )
}
