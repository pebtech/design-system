import React from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedText = Text as any

export interface LabelProps {
  children?: React.ReactNode
  disabled?: boolean
  className?: string
  style?: TextStyle
}

export function Label({ children, disabled, className, style, ...props }: LabelProps) {
  const { tokens } = useTheme()

  return (
    <TypedText
      {...props}
      className={cn('text-sm font-medium', className)}
      style={StyleSheet.flatten([
        {
          fontSize: 14,
          fontWeight: '500',
          color: disabled ? tokens.text.disabled : tokens.text.primary,
        },
        style,
      ])}
    >
      {children}
    </TypedText>
  )
}
