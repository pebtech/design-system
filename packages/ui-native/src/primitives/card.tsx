import { ReactNode } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedView = View as any

type SpacingVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'chart'
type BackgroundVariant = 'surface' | 'body' | 'transparent' | 'bodySecondary' | 'white'
type BorderRadiusVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface CardProps {
  content?: ReactNode
  children?: ReactNode
  spacing?: SpacingVariant
  background?: BackgroundVariant
  borderRadius?: BorderRadiusVariant
  shadow?: boolean
  border?: boolean
  className?: string
  style?: ViewStyle
  variant?: 'default' | 'elevated' | 'outlined' | 'minimal' | 'chart' | 'flat'
}

const variantPresets = {
  default: {
    spacing: 'md' as SpacingVariant,
    background: 'surface' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: true,
    border: false,
  },
  elevated: {
    spacing: 'lg' as SpacingVariant,
    background: 'surface' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: true,
    border: false,
  },
  outlined: {
    spacing: 'md' as SpacingVariant,
    background: 'transparent' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: false,
    border: true,
  },
  minimal: {
    spacing: 'md' as SpacingVariant,
    background: 'bodySecondary' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: false,
    border: false,
  },
  chart: {
    spacing: 'chart' as SpacingVariant,
    background: 'bodySecondary' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: false,
    border: false,
  },
  flat: {
    spacing: 'none' as SpacingVariant,
    background: 'white' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: false,
    border: true,
  },
}

export function Card({
  content,
  children,
  spacing,
  background,
  borderRadius,
  shadow,
  border,
  className,
  style,
  variant = 'default',
  ...props
}: CardProps) {
  const { tokens } = useTheme()

  const preset = variantPresets[variant]
  const finalSpacing = spacing ?? preset.spacing
  const finalBackground = background ?? preset.background
  const finalBorderRadius = borderRadius ?? preset.borderRadius
  const finalShadow = shadow ?? preset.shadow
  const finalBorder = border ?? preset.border

  // Map padding
  let padding = 16
  if (finalSpacing === 'none') padding = 0
  else if (finalSpacing === 'sm') padding = 8
  else if (finalSpacing === 'lg') padding = 24
  else if (finalSpacing === 'xl') padding = 32
  else if (finalSpacing === 'chart') padding = 16 // pb will be 0

  // Map border radius
  let radius = 12
  if (finalBorderRadius === 'none') radius = 0
  else if (finalBorderRadius === 'sm') radius = 4
  else if (finalBorderRadius === 'md') radius = 6
  else if (finalBorderRadius === 'lg') radius = 8
  else if (finalBorderRadius === 'xl') radius = 12
  else if (finalBorderRadius === 'full') radius = 9999

  // Map background color
  let bgColor = tokens.bg.surface
  if (finalBackground === 'body') bgColor = tokens.bg.body
  else if (finalBackground === 'transparent') bgColor = 'transparent'
  else if (finalBackground === 'bodySecondary') bgColor = tokens.bg.bodySecondary
  else if (finalBackground === 'white') bgColor = '#ffffff'

  return (
    <TypedView
      {...props}
      className={cn('w-full', className)}
      style={StyleSheet.flatten([
        {
          padding,
          paddingBottom: finalSpacing === 'chart' ? 0 : padding,
          borderRadius: radius,
          backgroundColor: bgColor,
          borderWidth: finalBorder ? 1 : 0,
          borderColor: tokens.border.primary,
        },
        finalShadow ? {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        } : {},
        style,
      ])}
    >
      {content ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {content}
        </View>
      ) : (
        children
      )}
    </TypedView>
  )
}
