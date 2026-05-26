import React, { createContext, useContext, useState } from 'react'
import { Toggle } from './toggle'
import { cn } from '../utils/cn'

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
  children: React.ReactNode
}

export function ToggleGroup({
  type,
  value: controlledValue,
  defaultValue,
  onChange,
  isDisabled,
  className,
  children,
  ...props
}: ToggleGroupProps) {
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
      <div
        data-slot="toggle-group"
        className={cn('inline-flex items-center gap-1 rounded-md border border-zinc-200 p-1 dark:border-zinc-800', className)}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

export interface ToggleGroupItemProps {
  value: string
  isDisabled?: boolean
  className?: string
  children: React.ReactNode
}

export function ToggleGroupItem({
  value: itemValue,
  isDisabled: itemDisabled,
  className,
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
      className={cn('h-8 px-2.5 text-xs', className)}
      {...props}
    >
      {children}
    </Toggle>
  )
}
