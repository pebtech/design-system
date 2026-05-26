import { View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedView = View as any

export interface SeparatorProps {
  soft?: boolean
  orientation?: 'horizontal' | 'vertical'
  className?: string
  style?: ViewStyle
}

export function Separator({
  soft = false,
  orientation = 'horizontal',
  className,
  style,
  ...props
}: SeparatorProps) {
  const { theme } = useTheme()

  const borderColor = soft
    ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(9, 9, 11, 0.05)')
    : (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(9, 9, 11, 0.1)')

  const isHorizontal = orientation === 'horizontal'

  return (
    <TypedView
      {...props}
      accessibilityRole="none"
      className={cn(
        isHorizontal ? 'w-full border-t' : 'h-full border-l',
        className
      )}
      style={StyleSheet.flatten([
        isHorizontal
          ? { width: '100%', borderTopWidth: 1, borderTopColor: borderColor }
          : { height: '100%', borderLeftWidth: 1, borderLeftColor: borderColor },
        style,
      ])}
    />
  )
}

export const Divider = Separator
