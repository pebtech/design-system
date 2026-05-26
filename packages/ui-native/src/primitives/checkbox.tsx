import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Animated, Pressable, View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TypedAnimatedView = Animated.View as any

interface CheckboxGroupContextValue {
  value: string[]
  addValue: (val: string) => void
  removeValue: (val: string) => void
  isDisabled: boolean
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)

export interface CheckboxGroupProps {
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  isDisabled?: boolean
  className?: string
  style?: ViewStyle
  children: React.ReactNode
}

export function CheckboxGroup({
  value: controlledValue,
  defaultValue,
  onChange,
  isDisabled = false,
  className,
  style,
  children,
  ...props
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => defaultValue ?? [])
  const value = controlledValue !== undefined ? controlledValue : internalValue

  const addValue = (val: string) => {
    if (isDisabled) return
    const newValue = [...value, val]
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const removeValue = (val: string) => {
    if (isDisabled) return
    const newValue = value.filter((v) => v !== val)
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <CheckboxGroupContext.Provider value={{ value, addValue, removeValue, isDisabled }}>
      <TypedView
        className={cn('space-y-3', className)}
        style={style}
        {...props}
      >
        {children}
      </TypedView>
    </CheckboxGroupContext.Provider>
  )
}

export interface CheckboxFieldProps {
  className?: string
  style?: ViewStyle
  children: React.ReactNode
}

export function CheckboxField({ className, style, children, ...props }: CheckboxFieldProps) {
  return (
    <TypedView
      className={cn('flex-row items-start gap-3', className)}
      style={style}
      {...props}
    >
      {children}
    </TypedView>
  )
}

export interface CheckboxProps {
  value?: string
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  isIndeterminate?: boolean
  className?: string
  style?: ViewStyle
  children?: React.ReactNode
}

export function Checkbox({
  value,
  isSelected: controlledSelected,
  defaultSelected,
  onChange,
  isDisabled: customDisabled,
  isIndeterminate,
  className,
  style,
  children,
  ...props
}: CheckboxProps) {
  const { tokens } = useTheme()
  const groupState = useContext(CheckboxGroupContext)

  const isDisabled = customDisabled || groupState?.isDisabled || false

  const isSelected = groupState && value
    ? groupState.value.includes(value)
    : (controlledSelected !== undefined ? controlledSelected : (defaultSelected || false))

  const handlePress = () => {
    if (isDisabled) return
    const nextSelected = !isSelected
    if (groupState && value) {
      if (nextSelected) {
        groupState.addValue(value)
      } else {
        groupState.removeValue(value)
      }
    } else {
      onChange?.(nextSelected)
    }
  }

  const checkedBg = tokens.bg.brand ?? '#09090b'
  const uncheckedBg = 'transparent'
  const checkedBorder = tokens.border.brand ?? tokens.bg.brand ?? '#09090b'
  const uncheckedBorder = tokens.border.primary ?? '#e4e4e7'

  const isVisible = isSelected || isIndeterminate
  // Initial value is read once; subsequent changes are driven by the effect below.
  const indicatorAnim = useMemo(
    () => new Animated.Value(isVisible ? 1 : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    Animated.timing(indicatorAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }, [isVisible, indicatorAnim])

  return (
    <TypedPressable
      disabled={isDisabled}
      onPress={handlePress}
      className={cn('flex-row items-center gap-2 active:opacity-80', className)}
      style={StyleSheet.flatten([
        { opacity: isDisabled ? 0.5 : 1 },
        style,
      ])}
      {...props}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected || isIndeterminate ? checkedBg : uncheckedBg,
          borderColor: isSelected || isIndeterminate ? checkedBorder : uncheckedBorder,
        }}
      >
        <TypedAnimatedView
          style={{
            width: isIndeterminate ? 8 : 8,
            height: isIndeterminate ? 2 : 8,
            borderRadius: isIndeterminate ? 0 : 1,
            backgroundColor: '#ffffff',
            opacity: indicatorAnim,
            transform: [{ scale: indicatorAnim }],
          }}
        />
      </View>
      {typeof children === 'string' ? (
        <Text weight="normal" size="sm" style={{ color: tokens.text.primary }}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TypedPressable>
  )
}
