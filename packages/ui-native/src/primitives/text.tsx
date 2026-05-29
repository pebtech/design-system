import React from 'react'
import { Text as RNText, StyleSheet, TextStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedText = RNText as any

type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'muted'
  | 'link'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'brand'
  | 'white'
  | 'disabled'

export interface TextProps {
  children?: React.ReactNode
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: TextColor
  className?: string
  style?: TextStyle
}

const sizes = {
  xs: { fontSize: 12, lineHeight: 16 },
  sm: { fontSize: 14, lineHeight: 20 },
  base: { fontSize: 16, lineHeight: 24 },
  lg: { fontSize: 18, lineHeight: 28 },
  xl: { fontSize: 20, lineHeight: 28 },
  '2xl': { fontSize: 24, lineHeight: 32 },
  '3xl': { fontSize: 30, lineHeight: 36 },
  '4xl': { fontSize: 36, lineHeight: 40 },
  '5xl': { fontSize: 48, lineHeight: 48 },
  '6xl': { fontSize: 60, lineHeight: 60 },
  '7xl': { fontSize: 72, lineHeight: 72 },
}

const weights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
}

export function Text({
  children,
  size = 'base',
  weight = 'normal',
  color = 'secondary',
  className,
  style,
  ...props
}: TextProps) {
  const { tokens } = useTheme()

  // Map semantic colors to token values
  let textColor = tokens.text.secondary
  if (color === 'primary') textColor = tokens.text.primary
  else if (color === 'tertiary') textColor = tokens.text.muted
  else if (color === 'muted') textColor = tokens.text.muted
  else if (color === 'link') textColor = tokens.text.link
  else if (color === 'error') textColor = tokens.text.error
  else if (color === 'success') textColor = tokens.text.success
  else if (color === 'warning') textColor = tokens.text.warning
  else if (color === 'info') textColor = tokens.text.info
  else if (color === 'brand') textColor = tokens.text.brand
  else if (color === 'white') textColor = '#ffffff'
  else if (color === 'disabled') textColor = tokens.text.disabled

  const sizeStyle = sizes[size]

  return (
    <TypedText
      {...props}
      className={cn(className)}
      style={StyleSheet.flatten([
        {
          fontFamily: 'Inter',
          fontSize: sizeStyle.fontSize,
          lineHeight: sizeStyle.lineHeight,
          fontWeight: weights[weight] as any,
          color: textColor,
        },
        style,
      ])}
    >
      {children}
    </TypedText>
  )
}
