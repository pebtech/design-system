import React from 'react'
import { TextInput, View, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedTextInput = TextInput as any
const TypedView = View as any

export interface InputProps {
  placeholder?: string
  value?: string
  defaultValue?: string
  onChangeText?: (text: string) => void
  disabled?: boolean
  invalid?: boolean
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url'
  className?: string
  style?: TextStyle
}

export const Input = React.forwardRef<any, InputProps>(function Input(
  {
    placeholder,
    value,
    defaultValue,
    onChangeText,
    disabled = false,
    invalid = false,
    secureTextEntry = false,
    keyboardType = 'default',
    className,
    style,
    ...props
  },
  ref
) {
  const { tokens, theme } = useTheme()

  const borderColor = invalid
    ? (tokens.text.error || '#ef4444')
    : (tokens.border.primary || '#e4e4e7')

  const bgColor = tokens.bg.surface || '#ffffff'
  const textColor = tokens.text.primary || '#18181b'
  const placeholderColor = tokens.text.muted || '#a1a1aa'

  return (
    <TypedTextInput
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      editable={!disabled}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      className={cn('w-full border rounded-lg px-3 py-2 text-base leading-6', className)}
      style={StyleSheet.flatten([
        {
          borderColor,
          backgroundColor: disabled ? (theme === 'dark' ? '#27272a' : '#f4f4f5') : bgColor,
          color: disabled ? tokens.text.disabled || '#a1a1aa' : textColor,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ])}
      {...props}
    />
  )
})

export interface InputGroupProps {
  className?: string
  style?: ViewStyle
  children: React.ReactNode
}

export function InputGroup({ children, className, style, ...props }: InputGroupProps) {
  return (
    <TypedView
      className={cn('relative w-full flex-row items-center', className)}
      style={style}
      {...props}
    >
      {children}
    </TypedView>
  )
}
