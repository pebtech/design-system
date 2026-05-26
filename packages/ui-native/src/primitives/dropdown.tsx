import React, { createContext, useContext, useState } from 'react'
import {
  Modal,
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any

// ─── Context ──────────────────────────────────────────────────
interface DropdownContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const DropdownContext = createContext<DropdownContextValue>({
  isOpen: false,
  setIsOpen: () => {},
})

// ─── Dropdown (root wrapper) ──────────────────────────────────
export interface DropdownProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function Dropdown({ children, className, style, ...props }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <TypedView className={cn(className)} style={style} {...props}>
        {children}
      </TypedView>
    </DropdownContext.Provider>
  )
}

// ─── DropdownButton (trigger) ─────────────────────────────────
export function DropdownButton({
  children,
  className,
  style,
  ...props
}: any) {
  const { isOpen, setIsOpen } = useContext(DropdownContext)
  const { tokens } = useTheme()

  return (
    <TypedPressable
      onPress={() => setIsOpen(!isOpen)}
      accessibilityRole="button"
      style={StyleSheet.flatten([
        {
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: tokens.border.primary || '#e4e4e7',
          backgroundColor: tokens.bg.surface || '#ffffff',
        },
        style,
      ])}
      className={cn(className)}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text size="sm" color="primary">
          {children}
        </Text>
      ) : (
        children
      )}
    </TypedPressable>
  )
}

// ─── DropdownMenu ─────────────────────────────────────────────
export function DropdownMenu({
  children,
  className,
  style,
}: any) {
  const { isOpen, setIsOpen } = useContext(DropdownContext)
  const { tokens } = useTheme()

  if (!isOpen) return null

  return (
    <Modal
      transparent
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      animationType="fade"
    >
      {/* Backdrop */}
      <TypedPressable
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
        }}
        onPress={() => setIsOpen(false)}
      >
        {/* Menu Panel */}
        <TypedPressable
          style={StyleSheet.flatten([
            {
              minWidth: 200,
              maxWidth: 300,
              maxHeight: 400,
              backgroundColor: tokens.bg.surface || '#ffffff',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: tokens.border.primary || '#e4e4e7',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 8,
              padding: 4,
            },
            style,
          ])}
          className={cn(className)}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {children}
          </ScrollView>
        </TypedPressable>
      </TypedPressable>
    </Modal>
  )
}

// ─── DropdownItem ─────────────────────────────────────────────
export function DropdownItem({
  children,
  onPress,
  disabled,
  className,
  style,
  ...props
}: {
  children: React.ReactNode
  onPress?: () => void
  disabled?: boolean
  className?: string
  style?: ViewStyle
  [key: string]: any
}) {
  const { setIsOpen } = useContext(DropdownContext)
  const { tokens } = useTheme()

  const handlePress = () => {
    if (disabled) return
    onPress?.()
    setIsOpen(false)
  }

  return (
    <TypedPressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="menuitem"
      style={({ pressed }: { pressed: boolean }) =>
        StyleSheet.flatten([
          {
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 8,
            opacity: disabled ? 0.5 : 1,
            backgroundColor: pressed
              ? tokens.bg.secondary || '#f4f4f5'
              : 'transparent',
          },
          style,
        ])
      }
      className={cn(className)}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text size="sm" color="primary">
          {children}
        </Text>
      ) : (
        children
      )}
    </TypedPressable>
  )
}

// ─── DropdownDivider ──────────────────────────────────────────
export function DropdownDivider({
  className,
  style,
  ...props
}: {
  className?: string
  style?: ViewStyle
  [key: string]: any
}) {
  const { tokens } = useTheme()

  return (
    <TypedView
      className={cn(className)}
      style={StyleSheet.flatten([
        {
          height: 1,
          backgroundColor: tokens.border.primary || '#e4e4e7',
          marginHorizontal: 14,
          marginVertical: 4,
        },
        style,
      ])}
      {...props}
    />
  )
}
