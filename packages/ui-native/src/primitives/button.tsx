import React, { useEffect, useMemo } from 'react'
import { Animated, Pressable, Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { useButton } from 'react-native-aria'
import { ButtonContext, useButtonContext } from '../utils/button-context'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedText = Text as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TypedAnimatedView = Animated.View as any

interface ButtonProps {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  disabled?: boolean
  onPress?: () => void
  className?: string
  style?: ViewStyle
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  color,
  disabled = false,
  onPress,
  className,
  style,
  ...props
}: ButtonProps) {
  const { tokens } = useTheme()

  const { buttonProps, isPressed } = useButton({
    isDisabled: disabled,
    onPress,
    ...props
  })

  const activeState = isPressed ? 'active' : (disabled ? 'disabled' : 'default')

  // Layout styling based on size
  let paddingVertical = 10
  let paddingHorizontal = 16
  let borderRadius = 8
  let gap = 8

  if (size === 'xs') {
    paddingVertical = 6
    paddingHorizontal = 10
    borderRadius = 6
    gap = 4
  } else if (size === 'sm') {
    paddingVertical = 8
    paddingHorizontal = 12
    borderRadius = 6
    gap = 6
  } else if (size === 'lg') {
    paddingVertical = 12
    paddingHorizontal = 20
    borderRadius = 8
    gap = 8
  } else if (size === 'xl') {
    paddingVertical = 16
    paddingHorizontal = 24
    borderRadius = 12
    gap = 10
  }

  // Color background styling based on variant
  let bg = tokens.bg.brand
  let borderW = 0
  let borderC = 'transparent'

  if (variant === 'secondary') {
    bg = tokens.bg.quaternary
  } else if (variant === 'outline') {
    bg = 'transparent'
    borderW = 1
    borderC = tokens.border.primary
  } else if (variant === 'ghost') {
    bg = 'transparent'
  } else if (variant === 'destructive') {
    bg = '#dc2626' // red-600
  }

  // Animated press feedback: scale + opacity driven by a single Animated.Value.
  // Both the scale transform and the interpolated opacity run on the native
  // driver so the spring stays smooth even under JS pressure.
  const pressAnim = useMemo(() => new Animated.Value(1), [])

  useEffect(() => {
    Animated.spring(pressAnim, {
      toValue: isPressed ? 0.96 : 1,
      useNativeDriver: true,
    }).start()
  }, [isPressed, pressAnim])

  const pressOpacity = pressAnim.interpolate({
    inputRange: [0.96, 1],
    outputRange: [0.85, 1],
  })

  return (
    <ButtonContext.Provider value={{ size, variant, state: activeState, color }}>
      <TypedPressable
        {...buttonProps}
        disabled={disabled}
        className={cn(
          'flex-row items-center justify-center border transition-all',
          className
        )}
        style={style}
      >
        <TypedAnimatedView
          style={StyleSheet.flatten([
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical,
              paddingHorizontal,
              borderRadius,
              backgroundColor: bg,
              borderWidth: borderW,
              borderColor: borderC,
              gap,
              opacity: disabled ? 0.5 : pressOpacity,
              transform: [{ scale: pressAnim }],
            },
          ])}
        >
          {children}
        </TypedAnimatedView>
      </TypedPressable>
    </ButtonContext.Provider>
  )
}

export function ButtonText({
  children,
  className,
  style,
}: {
  children?: React.ReactNode
  className?: string
  style?: TextStyle
}) {
  const context = useButtonContext()
  const { tokens } = useTheme()

  if (!context) {
    return <Text style={style}>{children}</Text>
  }

  const { size, variant } = context

  let fontSize = 16
  const fontWeight: TextStyle['fontWeight'] = '600'

  if (size === 'xs') fontSize = 12
  else if (size === 'sm') fontSize = 14
  else if (size === 'lg') fontSize = 18
  else if (size === 'xl') fontSize = 20

  // Text color based on variant
  let textColor = '#ffffff'
  if (variant === 'secondary') {
    textColor = tokens.text.primary
  } else if (variant === 'outline' || variant === 'ghost') {
    textColor = tokens.text.brand
  }

  return (
    <TypedText
      className={cn('font-semibold text-center', className)}
      style={StyleSheet.flatten([
        {
          fontSize,
          fontWeight,
          color: textColor,
        },
        style,
      ])}
    >
      {children}
    </TypedText>
  )
}

export function ButtonIcon({
  children,
  color,
  style,
}: {
  children?: React.ReactNode
  color?: string
  style?: any
}) {
  const context = useButtonContext()
  const { tokens } = useTheme()

  let iconColor = '#ffffff'
  if (context) {
    if (context.variant === 'secondary') {
      iconColor = tokens.text.secondary
    } else if (context.variant === 'outline' || context.variant === 'ghost') {
      iconColor = tokens.text.brand
    }
  }

  // If color prop is explicitly passed, use it
  const finalColor = color || iconColor

  // We can clone children and pass the final color if children is a single React element
  const renderedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<any>
      return React.cloneElement(element, { color: finalColor, size: element.props.size || (context?.size === 'xs' ? 14 : 18) })
    }
    return child
  })

  return <View style={style}>{renderedChildren}</View>
}

// Assign sub-components
Button.Text = ButtonText
Button.Icon = ButtonIcon
