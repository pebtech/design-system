import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import { Modal, Pressable, View, ScrollView, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any

// --- Menubar Context ---

interface MenubarContextValue {
  openMenuId: string | null
  setOpenMenuId: (id: string | null) => void
}

const MenubarContext = createContext<MenubarContextValue | null>(null)

function useMenubarContext() {
  const context = useContext(MenubarContext)
  if (!context) {
    throw new Error('Menubar compound components must be used within a Menubar')
  }
  return context
}

// --- MenubarMenu Context ---

interface MenubarMenuContextValue {
  menuId: string
  isOpen: boolean
  open: () => void
  close: () => void
  triggerLayout: { x: number; y: number; width: number; height: number }
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void
}

const MenubarMenuContext = createContext<MenubarMenuContextValue | null>(null)

function useMenubarMenuContext() {
  const context = useContext(MenubarMenuContext)
  if (!context) {
    throw new Error('MenubarMenu compound components must be used within a MenubarMenu')
  }
  return context
}

// --- Menubar ---

export interface MenubarProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function Menubar({ children, className, style }: MenubarProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const { tokens } = useTheme()

  return (
    <MenubarContext.Provider value={{ openMenuId, setOpenMenuId }}>
      <TypedView
        style={StyleSheet.flatten([
          {
            backgroundColor: tokens.bg.surface ?? '#ffffff',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: tokens.border.primary ?? '#e4e4e7',
            overflow: 'hidden',
          },
          style,
        ])}
        className={cn(className)}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            paddingHorizontal: 4,
            paddingVertical: 4,
          }}
        >
          {children}
        </ScrollView>
      </TypedView>
    </MenubarContext.Provider>
  )
}

// --- MenubarMenu ---

export interface MenubarMenuProps {
  children: React.ReactNode
  id: string
}

export function MenubarMenu({ children, id }: MenubarMenuProps) {
  const { openMenuId, setOpenMenuId } = useMenubarContext()
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const isOpen = openMenuId === id
  const open = useCallback(() => setOpenMenuId(id), [id, setOpenMenuId])
  const close = useCallback(() => setOpenMenuId(null), [setOpenMenuId])

  return (
    <MenubarMenuContext.Provider value={{ menuId: id, isOpen, open, close, triggerLayout, setTriggerLayout }}>
      {children}
    </MenubarMenuContext.Provider>
  )
}

// --- MenubarTrigger ---

export interface MenubarTriggerProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function MenubarTrigger({ children, className, style }: MenubarTriggerProps) {
  const { isOpen, open, close } = useMenubarMenuContext()
  const { tokens } = useTheme()
  const triggerRef = useRef<View>(null)
  const { setTriggerLayout } = useMenubarMenuContext()

  const handlePress = useCallback(() => {
    if (isOpen) {
      close()
    } else {
      if (triggerRef.current) {
        (triggerRef.current as any).measureInWindow(
          (x: number, y: number, width: number, height: number) => {
            setTriggerLayout({ x, y, width, height })
            open()
          }
        )
      }
    }
  }, [isOpen, open, close, setTriggerLayout])

  return (
    <TypedPressable
      ref={triggerRef}
      onPress={handlePress}
      accessibilityRole="menuitem"
      accessibilityState={{ expanded: isOpen }}
      style={StyleSheet.flatten([
        {
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 6,
          backgroundColor: isOpen
            ? (tokens.hover.primary ?? '#f4f4f5')
            : 'transparent',
        },
        style,
      ])}
      className={cn(className)}
    >
      {typeof children === 'string' ? (
        <Text
          size="sm"
          weight="medium"
          style={{ color: tokens.text.primary ?? '#18181b' }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TypedPressable>
  )
}

// --- MenubarContent ---

export interface MenubarContentProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function MenubarContent({ children, className, style }: MenubarContentProps) {
  const { isOpen, close, triggerLayout } = useMenubarMenuContext()
  const { tokens } = useTheme()

  if (!isOpen) return null

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
              top: triggerLayout.y + triggerLayout.height + 4,
              left: triggerLayout.x,
              minWidth: 180,
              backgroundColor: tokens.bg.surface ?? '#ffffff',
              borderRadius: 12,
              paddingVertical: 4,
              borderWidth: 1,
              borderColor: tokens.border.primary ?? '#e4e4e7',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 8,
            },
            style,
          ])}
          className={cn(className)}
        >
          {children}
        </TypedView>
      </TypedPressable>
    </Modal>
  )
}

// --- MenubarItem ---

export interface MenubarItemProps {
  children: React.ReactNode
  onPress?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function MenubarItem({
  children,
  onPress,
  disabled = false,
  icon,
  className,
  style,
}: MenubarItemProps) {
  const { close } = useMenubarMenuContext()
  const { tokens } = useTheme()

  const handlePress = useCallback(() => {
    if (disabled) return
    onPress?.()
    close()
  }, [disabled, onPress, close])

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
          paddingVertical: 10,
          paddingHorizontal: 14,
          gap: 10,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ])}
      className={cn(className)}
    >
      {icon && (
        <TypedView style={{ width: 20, alignItems: 'center' }}>
          {icon}
        </TypedView>
      )}
      {typeof children === 'string' ? (
        <Text
          size="sm"
          style={{
            color: disabled
              ? (tokens.text.secondary ?? '#a1a1aa')
              : (tokens.text.primary ?? '#18181b'),
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TypedPressable>
  )
}
