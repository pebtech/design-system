import React, { createContext, useContext, useState } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { Toggle } from './toggle'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'

const TypedView = View as any

interface ToggleGroupContextValue {
  value: string | string[] | undefined
  onChange: (itemValue: string) => void
  type: 'single' | 'multiple'
  isDisabled?: boolean
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null)

export interface ToggleGroupProps {
  type: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: any) => void
  isDisabled?: boolean
  className?: string
  style?: ViewStyle
  children: React.ReactNode
}

export function ToggleGroup({
  type,
  value: controlledValue,
  defaultValue,
  onChange,
  isDisabled,
  className,
  style,
  children,
  ...props
}: ToggleGroupProps) {
  const { tokens } = useTheme()
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (defaultValue !== undefined) return defaultValue
    return type === 'multiple' ? [] : ''
  })
  const value = controlledValue !== undefined ? controlledValue : internalValue

  const handleItemChange = (itemValue: string) => {
    if (isDisabled) return

    let newValue: string | string[]
    if (type === 'multiple') {
      const currentValues = Array.isArray(value) ? value : []
      if (currentValues.includes(itemValue)) {
        newValue = currentValues.filter((v) => v !== itemValue)
      } else {
        newValue = [...currentValues, itemValue]
      }
    } else {
      newValue = value === itemValue ? '' : itemValue
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <ToggleGroupContext.Provider value={{ value, onChange: handleItemChange, type, isDisabled }}>
      <TypedView
        className={cn('flex-row items-center gap-1 rounded-md border p-1', className)}
        style={StyleSheet.flatten([
          {
            borderColor: tokens.border.primary ?? '#e4e4e7',
            alignSelf: 'flex-start',
          },
          style,
        ])}
        {...props}
      >
        {children}
      </TypedView>
    </ToggleGroupContext.Provider>
  )
}

export interface ToggleGroupItemProps {
  value: string
  isDisabled?: boolean
  className?: string
  style?: ViewStyle
  children: React.ReactNode
}

export function ToggleGroupItem({
  value: itemValue,
  isDisabled: itemDisabled,
  className,
  style,
  children,
  ...props
}: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext)
  if (!context) {
    throw new Error('ToggleGroupItem must be used within a ToggleGroup')
  }

  const { value, onChange, isDisabled: groupDisabled } = context
  const isDisabled = itemDisabled || groupDisabled

  const isSelected = Array.isArray(value)
    ? value.includes(itemValue)
    : value === itemValue

  return (
    <Toggle
      isSelected={isSelected}
      onChange={() => onChange(itemValue)}
      isDisabled={isDisabled}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </Toggle>
  )
}
