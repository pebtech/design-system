import { useEffect, useRef } from 'react'
import { Animated, ViewStyle, StyleSheet } from 'react-native'
import { useTheme } from '../providers/theme-provider'

export interface SkeletonProps {
  className?: string
  style?: ViewStyle
}

export function Skeleton({ className, style, ...props }: SkeletonProps) {
  const { theme } = useTheme()
  const opacity = useRef(new Animated.Value(0.3)).current

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
    <Animated.View
      {...props}
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
