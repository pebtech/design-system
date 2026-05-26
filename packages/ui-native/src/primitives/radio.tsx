import React, { createContext, useContext, useState } from 'react'
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any

interface RadioGroupContextValue {
  value: string
  selectValue: (val: string) => void
  isDisabled: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  isDisabled?: boolean
  className?: string
  style?: ViewStyle
  children: React.ReactNode
}

export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onChange,
  isDisabled = false,
  className,
  style,
  children,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '')
  const value = controlledValue !== undefined ? controlledValue : internalValue

  const selectValue = (val: string) => {
    if (isDisabled) return
    if (controlledValue === undefined) {
      setInternalValue(val)
    }
    onChange?.(val)
  }

  return (
    <RadioGroupContext.Provider value={{ value, selectValue, isDisabled }}>
      <TypedView
        className={cn('space-y-3', className)}
        style={style}
        {...props}
      >
        {children}
      </TypedView>
    </RadioGroupContext.Provider>
  )
}

export interface RadioFieldProps {
  className?: string
  style?: ViewStyle
  children: React.ReactNode
}

export function RadioField({ className, style, children, ...props }: RadioFieldProps) {
  return (
    <TypedView
      className={cn('flex-row items-center gap-3', className)}
      style={style}
      {...props}
    >
      {children}
    </TypedView>
  )
}

export interface RadioProps {
  value: string
  isDisabled?: boolean
  className?: string
  style?: ViewStyle
  children?: React.ReactNode
}

export function Radio({
  value,
  isDisabled: customDisabled,
  className,
  style,
  children,
  ...props
}: RadioProps) {
  const { tokens } = useTheme()
  const groupState = useContext(RadioGroupContext)

  if (!groupState) {
    throw new Error('Radio must be used within a RadioGroup')
  }

  const isDisabled = customDisabled || groupState.isDisabled || false
  const isSelected = groupState.value === value

  const handlePress = () => {
    if (isDisabled) return
    groupState.selectValue(value)
  }

  const checkedBg = tokens.bg.brand ?? '#09090b'
  const uncheckedBg = 'transparent'
  const checkedBorder = tokens.border.brand ?? tokens.bg.brand ?? '#09090b'
  const uncheckedBorder = tokens.border.primary ?? '#e4e4e7'

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
          borderRadius: 9,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected ? checkedBg : uncheckedBg,
          borderColor: isSelected ? checkedBorder : uncheckedBorder,
        }}
      >
        {isSelected && (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#ffffff',
            }}
          />
        )}
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
