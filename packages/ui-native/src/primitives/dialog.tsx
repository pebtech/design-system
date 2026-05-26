import React, { createContext } from 'react'
import { Modal, Pressable, View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any

const DialogContext = createContext<{ onClose?: () => void }>({})

export interface DialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function Dialog({
  open,
  onClose,
  children,
  className,
  style,
  ...props
}: DialogProps) {
  const { tokens } = useTheme()

  return (
    <Modal
      transparent
      visible={open}
      onRequestClose={onClose}
      animationType="fade"
      {...props}
    >
      <TypedPressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
        onPress={onClose}
      >
        <TypedPressable
          style={StyleSheet.flatten([
            {
              width: '100%',
              backgroundColor: tokens.bg.surface ?? '#ffffff',
              borderRadius: 16,
              padding: 24,
              borderWidth: 1,
              borderColor: tokens.border.primary ?? '#e4e4e7',
            },
            style,
          ])}
          className={cn(className)}
        >
          <DialogContext.Provider value={{ onClose }}>
            {children}
          </DialogContext.Provider>
        </TypedPressable>
      </TypedPressable>
    </Modal>
  )
}

export function DialogTitle({ children, className, style, ...props }: any) {
  const { tokens } = useTheme()
  return (
    <Text
      weight="semibold"
      size="lg"
      style={StyleSheet.flatten([{ color: tokens.text.primary ?? '#18181b', marginBottom: 8 }, style])}
      className={className}
      {...props}
    >
      {children}
    </Text>
  )
}

export function DialogDescription({ children, className, style, ...props }: any) {
  const { tokens } = useTheme()
  return (
    <Text
      weight="normal"
      size="sm"
      style={StyleSheet.flatten([{ color: tokens.text.secondary ?? '#71717a', marginBottom: 16 }, style])}
      className={className}
      {...props}
    >
      {children}
    </Text>
  )
}

export function DialogBody({ children, className, style, ...props }: any) {
  return (
    <TypedView className={cn('my-4', className)} style={style} {...props}>
      {children}
    </TypedView>
  )
}

export function DialogActions({ children, className, style, ...props }: any) {
  return (
    <TypedView
      className={cn('flex-row items-center justify-end gap-3 mt-6', className)}
      style={style}
      {...props}
    >
      {children}
    </TypedView>
  )
}
