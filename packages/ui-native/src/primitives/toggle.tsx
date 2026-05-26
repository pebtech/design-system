import React from 'react'
import { Pressable, StyleSheet, ViewStyle } from 'react-native'
import { useToggleState } from 'react-stately'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any

export interface ToggleProps {
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  className?: string
  style?: ViewStyle
  children: React.ReactNode
}

export function Toggle({
  isSelected,
  defaultSelected,
  onChange,
  isDisabled,
  className,
  style,
  children,
  ...props
}: ToggleProps) {
  const { tokens } = useTheme()
  const state = useToggleState({
    isSelected,
    defaultSelected,
    onChange,
  })

  const activeBg = tokens.bg.brand || '#09090b'
  const inactiveBg = 'transparent'
  const activeBorder = tokens.border.brand || tokens.bg.brand || '#09090b'
  const inactiveBorder = tokens.border.primary || '#e4e4e7'

  return (
    <TypedPressable
      disabled={isDisabled}
      onPress={() => state.setSelected(!state.isSelected)}
      className={cn('items-center justify-center rounded-md border py-2 px-4 transition-all active:opacity-80', className)}
      style={StyleSheet.flatten([
        {
          backgroundColor: state.isSelected ? activeBg : inactiveBg,
          borderColor: state.isSelected ? activeBorder : inactiveBorder,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ])}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          weight="medium"
          size="sm"
          style={{
            color: state.isSelected ? '#ffffff' : tokens.text.secondary,
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
