import React, { useMemo } from 'react'
import { Animated, Pressable, StyleSheet, ViewStyle } from 'react-native'
import { useToggleState } from 'react-stately'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TypedAnimatedView = Animated.View as any

export interface ToggleProps {
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  className?: string
  style?: ViewStyle
  children: React.ReactNode
}

export function Toggle({
  isSelected,
  defaultSelected,
  onChange,
  isDisabled,
  className,
  style,
  children,
  ...props
}: ToggleProps) {
  const { tokens } = useTheme()
  const state = useToggleState({
    isSelected,
    defaultSelected,
    onChange,
  })

  const activeBg = tokens.bg.brand ?? '#09090b'
  const inactiveBg = 'transparent'
  const activeBorder = tokens.border.brand ?? tokens.bg.brand ?? '#09090b'
  const inactiveBorder = tokens.border.primary ?? '#e4e4e7'

  const pressScale = useMemo(() => new Animated.Value(1), [])

  const handlePressIn = () => {
    Animated.timing(pressScale, {
      toValue: 0.96,
      duration: 80,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(pressScale, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start()
  }

  return (
    <TypedAnimatedView style={{ transform: [{ scale: pressScale }] }}>
      <TypedPressable
        disabled={isDisabled}
        onPress={() => state.setSelected(!state.isSelected)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={cn('items-center justify-center rounded-md border py-2 px-4', className)}
        style={StyleSheet.flatten([
          {
            backgroundColor: state.isSelected ? activeBg : inactiveBg,
            borderColor: state.isSelected ? activeBorder : inactiveBorder,
            opacity: isDisabled ? 0.5 : 1,
          },
          style,
        ])}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text
            weight="medium"
            size="sm"
            style={{
              color: state.isSelected ? '#ffffff' : tokens.text.secondary,
            }}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </TypedPressable>
    </TypedAnimatedView>
  )
}
