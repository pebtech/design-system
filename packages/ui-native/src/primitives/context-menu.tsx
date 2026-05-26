import React, { createContext, useContext, useState, useCallback } from 'react'
import { Modal, Pressable, View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any

// --- ContextMenu Context ---

interface ContextMenuContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

function useContextMenuContext() {
  const context = useContext(ContextMenuContext)
  if (!context) {
    throw new Error('ContextMenu compound components must be used within a ContextMenu')
  }
  return context
}

// --- ContextMenu ---

export interface ContextMenuProps {
  children: React.ReactNode
}

export function ContextMenu({ children }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <ContextMenuContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContextMenuContext.Provider>
  )
}

// --- ContextMenuTrigger ---

export interface ContextMenuTriggerProps {
  children: React.ReactNode
  delayLongPress?: number
  className?: string
  style?: ViewStyle
}

export function ContextMenuTrigger({
  children,
  delayLongPress = 500,
  className,
  style,
}: ContextMenuTriggerProps) {
  const { open } = useContextMenuContext()

  return (
    <TypedPressable
      onLongPress={open}
      delayLongPress={delayLongPress}
      accessibilityRole="button"
      accessibilityHint="Long press to open context menu"
      style={style}
      className={cn(className)}
    >
      {children}
    </TypedPressable>
  )
}

// --- ContextMenuContent ---

export interface ContextMenuContentProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
  title?: string
}

export function ContextMenuContent({
  children,
  className,
  style,
  title,
}: ContextMenuContentProps) {
  const { isOpen, close } = useContextMenuContext()
  const { tokens } = useTheme()

  return (
    <Modal
      transparent
      visible={isOpen}
      onRequestClose={close}
      animationType="slide"
    >
      <TypedPressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          justifyContent: 'flex-end',
        }}
        onPress={close}
      >
        <TypedPressable
          style={StyleSheet.flatten([
            {
              backgroundColor: tokens.bg.surface || '#ffffff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 12,
              paddingBottom: 34,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderBottomWidth: 0,
              borderColor: tokens.border.primary || '#e4e4e7',
            },
            style,
          ])}
          className={cn(className)}
        >
          {/* Handle indicator */}
          <TypedView
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: tokens.border.primary || '#d4d4d8',
              alignSelf: 'center',
              marginBottom: 16,
            }}
          />

          {title && (
            <Text
              weight="semibold"
              size="sm"
              style={{
                color: tokens.text.secondary || '#71717a',
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              {title}
            </Text>
          )}

          {children}
        </TypedPressable>
      </TypedPressable>
    </Modal>
  )
}

// --- ContextMenuItem ---

export interface ContextMenuItemProps {
  children: React.ReactNode
  onPress?: () => void
  disabled?: boolean
  destructive?: boolean
  icon?: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function ContextMenuItem({
  children,
  onPress,
  disabled = false,
  destructive = false,
  icon,
  className,
  style,
}: ContextMenuItemProps) {
  const { close } = useContextMenuContext()
  const { tokens } = useTheme()

  const handlePress = useCallback(() => {
    if (disabled) return
    onPress?.()
    close()
  }, [disabled, onPress, close])

  const textColor = destructive
    ? '#ef4444'
    : disabled
    ? tokens.text.secondary || '#a1a1aa'
    : tokens.text.primary || '#18181b'

  return (
    <TypedPressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled }}
      style={StyleSheet.flatten([
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 12,
          gap: 12,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ])}
      className={cn(className)}
    >
      {icon && (
        <TypedView style={{ width: 24, alignItems: 'center' }}>
          {icon}
        </TypedView>
      )}
      {typeof children === 'string' ? (
        <Text
          size="base"
          weight="medium"
          style={{ color: textColor, flex: 1 }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TypedPressable>
  )
}
