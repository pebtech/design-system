import { useEffect, useMemo } from 'react'
import { Animated, ViewStyle, StyleSheet } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

// Animated.View doesn't accept the nativewind `className` prop directly in its
// types, so we cast to any to forward it without losing the prop.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TypedAnimatedView = Animated.View as any

export interface SkeletonProps {
  className?: string
  style?: ViewStyle
}

export function Skeleton({ className, style, ...props }: SkeletonProps) {
  const { theme } = useTheme()
  const opacity = useMemo(() => new Animated.Value(0.3), [])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [opacity])

  const backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(9, 9, 11, 0.1)'

  return (
    <TypedAnimatedView
      {...props}
      className={cn(className)}
      style={StyleSheet.flatten([
        {
          borderRadius: 6,
          backgroundColor,
          opacity,
        },
        style,
      ])}
    />
  )
}
