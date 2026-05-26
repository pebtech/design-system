import React from 'react'
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedView = View as any
const TypedPressable = Pressable as any

// Mapping color styles based on theme mode
const colorPresets = {
  white: {
    bgLight: '#ffffff',
    textLight: '#18181b',
    bgDark: '#18181b',
    textDark: '#ffffff',
  },
  red: {
    bgLight: 'rgba(239, 68, 68, 0.15)',
    textLight: '#b91c1c',
    bgDark: 'rgba(239, 68, 68, 0.1)',
    textDark: '#f87171',
  },
  orange: {
    bgLight: 'rgba(249, 115, 22, 0.15)',
    textLight: '#c2410c',
    bgDark: 'rgba(249, 115, 22, 0.1)',
    textDark: '#fb923c',
  },
  amber: {
    bgLight: 'rgba(245, 158, 11, 0.2)',
    textLight: '#b45309',
    bgDark: 'rgba(245, 158, 11, 0.1)',
    textDark: '#fbbf24',
  },
  yellow: {
    bgLight: 'rgba(250, 204, 21, 0.2)',
    textLight: '#a16207',
    bgDark: 'rgba(250, 204, 21, 0.1)',
    textDark: '#fde047',
  },
  lime: {
    bgLight: 'rgba(132, 204, 22, 0.2)',
    textLight: '#4d7c0f',
    bgDark: 'rgba(132, 204, 22, 0.1)',
    textDark: '#bef264',
  },
  green: {
    bgLight: 'rgba(34, 197, 94, 0.15)',
    textLight: '#15803d',
    bgDark: 'rgba(34, 197, 94, 0.1)',
    textDark: '#4ade80',
  },
  emerald: {
    bgLight: 'rgba(16, 185, 129, 0.15)',
    textLight: '#047857',
    bgDark: 'rgba(16, 185, 129, 0.1)',
    textDark: '#34d399',
  },
  teal: {
    bgLight: 'rgba(20, 184, 166, 0.15)',
    textLight: '#0f766e',
    bgDark: 'rgba(20, 184, 166, 0.1)',
    textDark: '#5eead4',
  },
  cyan: {
    bgLight: 'rgba(6, 182, 212, 0.2)',
    textLight: '#0e7490',
    bgDark: 'rgba(6, 182, 212, 0.1)',
    textDark: '#67e8f9',
  },
  sky: {
    bgLight: 'rgba(14, 165, 233, 0.15)',
    textLight: '#0369a1',
    bgDark: 'rgba(14, 165, 233, 0.1)',
    textDark: '#7dd3fc',
  },
  blue: {
    bgLight: 'rgba(59, 130, 246, 0.15)',
    textLight: '#1d4ed8',
    bgDark: 'rgba(59, 130, 246, 0.1)',
    textDark: '#60a5fa',
  },
  indigo: {
    bgLight: 'rgba(99, 102, 241, 0.15)',
    textLight: '#4338ca',
    bgDark: 'rgba(99, 102, 241, 0.1)',
    textDark: '#818cf8',
  },
  violet: {
    bgLight: 'rgba(139, 92, 246, 0.15)',
    textLight: '#6d28d9',
    bgDark: 'rgba(139, 92, 246, 0.1)',
    textDark: '#a78bfa',
  },
  purple: {
    bgLight: 'rgba(168, 85, 247, 0.15)',
    textLight: '#7e22ce',
    bgDark: 'rgba(168, 85, 247, 0.1)',
    textDark: '#c084fc',
  },
  fuchsia: {
    bgLight: 'rgba(217, 70, 239, 0.15)',
    textLight: '#a21caf',
    bgDark: 'rgba(217, 70, 239, 0.1)',
    textDark: '#e879f9',
  },
  pink: {
    bgLight: 'rgba(244, 63, 94, 0.15)',
    textLight: '#be185d',
    bgDark: 'rgba(244, 63, 94, 0.1)',
    textDark: '#f472b6',
  },
  rose: {
    bgLight: 'rgba(244, 63, 94, 0.15)',
    textLight: '#be185d',
    bgDark: 'rgba(244, 63, 94, 0.1)',
    textDark: '#fb7185',
  },
  zinc: {
    bgLight: 'rgba(113, 113, 122, 0.1)',
    textLight: '#3f3f46',
    bgDark: 'rgba(255, 255, 255, 0.05)',
    textDark: '#a1a1aa',
  },
}

const sizes = {
  xs: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 10,
    lineHeight: 14,
  },
  sm: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 12,
    lineHeight: 16,
  },
  base: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  lg: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  xl: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    fontSize: 16,
    lineHeight: 24,
  },
}

export interface BadgeProps {
  color?: keyof typeof colorPresets
  size?: keyof typeof sizes
  children: React.ReactNode
  className?: string
  style?: ViewStyle
}

export function Badge({
  color = 'zinc',
  size = 'sm',
  children,
  className,
  style,
  ...props
}: BadgeProps) {
  const { theme } = useTheme()

  const preset = colorPresets[color] || colorPresets.zinc
  const isDark = theme === 'dark'
  const backgroundColor = isDark ? preset.bgDark : preset.bgLight
  const textColor = isDark ? preset.textDark : preset.textLight

  const sizeStyle = sizes[size] || sizes.sm

  return (
    <TypedView
      {...props}
      className={cn('inline-flex flex-row items-center justify-center rounded-md font-medium', className)}
      style={StyleSheet.flatten([
        {
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          backgroundColor,
          alignSelf: 'flex-start',
        },
        style,
      ])}
    >
      <Text
        weight="medium"
        style={{
          fontSize: sizeStyle.fontSize,
          lineHeight: sizeStyle.lineHeight,
          color: textColor,
        }}
      >
        {children}
      </Text>
    </TypedView>
  )
}

export interface BadgeButtonProps extends BadgeProps {
  onPress?: () => void
  disabled?: boolean
  className?: string
  style?: ViewStyle
}

export function BadgeButton({
  color = 'zinc',
  size = 'sm',
  children,
  onPress,
  disabled = false,
  className,
  style,
  ...props
}: BadgeButtonProps) {
  return (
    <TypedPressable
      onPress={onPress}
      disabled={disabled}
      className={cn('active:opacity-80 transition-opacity rounded-md', className)}
      style={StyleSheet.flatten([
        {
          alignSelf: 'flex-start',
        },
        style,
      ])}
    >
      <Badge color={color} size={size} {...props}>
        {children}
      </Badge>
    </TypedPressable>
  )
}
