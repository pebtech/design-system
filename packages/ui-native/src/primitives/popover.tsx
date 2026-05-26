import React, { createContext, useContext, useState } from 'react'
import { Modal, Pressable, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any

const PopoverContext = createContext<any>(null)

export interface PopoverProps {
  children: React.ReactNode
}

export function Popover({ children }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </PopoverContext.Provider>
  )
}

export function PopoverTrigger({ children }: { children: React.ReactElement }) {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('PopoverTrigger must be used within a Popover')
  }
  const { setIsOpen } = context

  return React.cloneElement(children as React.ReactElement<any>, {
    onPress: () => setIsOpen(true),
  })
}

export interface PopoverContentProps {
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function PopoverContent({ children, className, style }: PopoverContentProps) {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('PopoverContent must be used within a Popover')
  }
  const { isOpen, setIsOpen } = context
  const { tokens } = useTheme()

  return (
    <Modal
      transparent
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      animationType="fade"
    >
      <TypedPressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
        onPress={() => setIsOpen(false)}
      >
        <TypedPressable
          style={StyleSheet.flatten([
            {
              width: '90%',
              backgroundColor: tokens.bg.surface ?? '#ffffff',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: tokens.border.primary ?? '#e4e4e7',
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
