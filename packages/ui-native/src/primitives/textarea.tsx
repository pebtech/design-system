import React from 'react'
import { TextInput, StyleSheet, TextStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedTextInput = TextInput as any

export interface TextareaProps {
  placeholder?: string
  value?: string
  defaultValue?: string
  onChangeText?: (text: string) => void
  disabled?: boolean
  invalid?: boolean
  numberOfLines?: number
  className?: string
  style?: TextStyle
}

export const Textarea = React.forwardRef<any, TextareaProps>(function Textarea(
  {
    placeholder,
    value,
    defaultValue,
    onChangeText,
    disabled = false,
    invalid = false,
    numberOfLines = 4,
    className,
    style,
    ...props
  },
  ref
) {
  const { tokens, theme } = useTheme()

  const borderColor = invalid
    ? (tokens.text.error ?? '#ef4444')
    : (tokens.border.primary ?? '#e4e4e7')

  const bgColor = tokens.bg.surface ?? '#ffffff'
  const textColor = tokens.text.primary ?? '#18181b'
  const placeholderColor = tokens.text.muted ?? '#a1a1aa'

  return (
    <TypedTextInput
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      editable={!disabled}
      multiline
      numberOfLines={numberOfLines}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      className={cn('w-full border rounded-lg px-3 py-2 text-base leading-6 text-align-vertical-top', className)}
      style={StyleSheet.flatten([
        {
          borderColor,
          backgroundColor: disabled ? (theme === 'dark' ? '#27272a' : '#f4f4f5') : bgColor,
          color: disabled ? tokens.text.disabled ?? '#a1a1aa' : textColor,
          opacity: disabled ? 0.6 : 1,
          height: numberOfLines * 24 + 16, // approximate height
          textAlignVertical: 'top',
        },
        style,
      ])}
      {...props}
    />
  )
})
