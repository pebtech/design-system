import { View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedView = View as any

interface ProgressProps {
  value?: number
  max?: number
  color?: 'indigo' | 'green' | 'red' | 'amber' | 'blue' | 'zinc' | 'cyan' | 'purple' | 'brand'
  className?: string
  style?: ViewStyle
}

const colorMap: Record<string, string> = {
  indigo: '#4f46e5',
  green: '#16a34a',
  red: '#dc2626',
  amber: '#f59e0b',
  blue: '#2563eb',
  zinc: '#52525b',
  cyan: '#0891b2',
  purple: '#9333ea',
}

export function Progress({
  value = 0,
  max = 100,
  color = 'indigo',
  className,
  style,
}: ProgressProps) {
  const { tokens } = useTheme()
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const barColor =
    color === 'brand'
      ? tokens.bg.brand ?? '#4f46e5'
      : colorMap[color] || '#4f46e5'

  return (
    <TypedView
      className={cn(className)}
      style={StyleSheet.flatten([
        {
          height: 8,
          width: '100%',
          borderRadius: 9999,
          backgroundColor: tokens.bg.secondary ?? '#f4f4f5',
          overflow: 'hidden',
        },
        style,
      ])}
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max,
        now: value,
      }}
    >
      <TypedView
        style={{
          height: '100%',
          width: `${percentage}%`,
          borderRadius: 9999,
          backgroundColor: barColor,
        }}
      />
    </TypedView>
  )
}
