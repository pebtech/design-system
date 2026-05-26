import React, { useRef } from 'react'
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native'
import { useToggleState } from 'react-stately'
import { useSwitch } from '@react-native-aria/switch'
import { FieldProvider, useFieldContext } from '../utils/field-context'
import { useTheme } from '../providers/theme-provider'
import { cn } from '../utils/cn'
export interface SharedToggleProps {
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  isReadOnly?: boolean
}

export interface SharedSwitchProps extends SharedToggleProps {
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-details'?: string
}

const TypedView = View as any
const TypedText = Text as any

interface SwitchFieldProps {
  children?: React.ReactNode
  disabled?: boolean
  invalid?: boolean
  className?: string
  style?: ViewStyle
}

export function SwitchField({
  children,
  disabled,
  invalid,
  className,
  style,
}: SwitchFieldProps) {
  // Separate Switch control from other children (Label, Description)
  const childrenArray = React.Children.toArray(children)
  const control = childrenArray.find(
    (child) => React.isValidElement(child) && (child.type as any).displayName === 'Switch'
  )
  const content = childrenArray.filter(
    (child) => !React.isValidElement(child) || (child.type as any).displayName !== 'Switch'
  )

  return (
    <FieldProvider disabled={disabled} invalid={invalid}>
      <TypedView
        className={cn('flex-row items-center justify-between py-2 gap-4', className)}
        style={StyleSheet.flatten([
          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
          style
        ])}
      >
        <View style={{ flex: 1, paddingRight: 16 }}>
          {content}
        </View>
        {control}
      </TypedView>
    </FieldProvider>
  )
}

export function SwitchLabel({
  children,
  className,
  style,
  ...props
}: {
  children?: React.ReactNode
  className?: string
  style?: any
}) {
  const context = useFieldContext()
  const { tokens } = useTheme()

  const isDisabled = context?.disabled

  return (
    <TypedText
      nativeID={context?.labelId}
      className={cn('text-base font-semibold', className)}
      style={StyleSheet.flatten([
        {
          fontSize: 16,
          fontWeight: '600',
          color: isDisabled ? tokens.text.disabled : tokens.text.primary,
        },
        style,
      ])}
      {...props}
    >
      {children}
    </TypedText>
  )
}

export function SwitchDescription({
  children,
  className,
  style,
  ...props
}: {
  children?: React.ReactNode
  className?: string
  style?: any
}) {
  const context = useFieldContext()
  const { tokens } = useTheme()

  const isDisabled = context?.disabled

  return (
    <TypedText
      nativeID={context?.descriptionId}
      className={cn('text-sm mt-1', className)}
      style={StyleSheet.flatten([
        {
          fontSize: 14,
          marginTop: 4,
          color: isDisabled ? tokens.text.disabled : tokens.text.secondary,
        },
        style,
      ])}
      {...props}
    >
      {children}
    </TypedText>
  )
}

const sizes = {
  sm: { width: 36, height: 20, thumbSize: 16 },
  md: { width: 44, height: 24, thumbSize: 18 },
  lg: { width: 64, height: 36, thumbSize: 30 },
}

export interface SwitchProps extends SharedSwitchProps {
  color?: 'brand' | 'zinc' | 'red' | 'green' | 'blue' | 'indigo' | 'purple' | 'amber' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: ViewStyle
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
}

export function Switch({
  color = 'brand',
  size = 'md',
  className,
  style,
  checked,
  defaultChecked,
  onChange,
  disabled,
  ...props
}: SwitchProps) {
  const context = useFieldContext()
  const { tokens, theme } = useTheme()

  const isSelected = checked !== undefined ? checked : props.isSelected
  const defaultSelected = defaultChecked !== undefined ? defaultChecked : props.defaultSelected
  const isDisabled = (disabled !== undefined ? disabled : props.isDisabled) ?? context?.disabled

  const state = useToggleState({
    ...props,
    isSelected,
    defaultSelected,
    onChange,
    isDisabled,
  })

  const ref = useRef<any>(null)
  
  // Set accessibility attributes
  const ariaLabelledby = props['aria-labelledby'] || context?.labelId
  const ariaDescribedby = props['aria-describedby'] || context?.descriptionId

  const { inputProps } = useSwitch(
    {
      ...props,
      isSelected,
      defaultSelected,
      onChange,
      isDisabled,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
    },
    state,
    ref
  )

  const sizeStyle = sizes[size]
  
  // Get active background color
  let activeBg = tokens.bg.brand
  if (color === 'zinc') activeBg = '#52525b'
  else if (color === 'red') activeBg = '#ef4444'
  else if (color === 'green') activeBg = '#22c55e'
  else if (color === 'blue') activeBg = '#3b82f6'
  else if (color === 'indigo') activeBg = '#6366f1'
  else if (color === 'purple') activeBg = '#a855f7'
  else if (color === 'amber') activeBg = '#f59e0b'
  else if (color === 'dark') activeBg = '#18181b'

  const currentBgColor = state.isSelected ? activeBg : (theme === 'dark' ? '#3f3f46' : '#e4e4e7')

  return (
    <Pressable
      {...(inputProps as any)}
      disabled={isDisabled}
      onPress={() => {
        if (!isDisabled) {
          state.toggle()
        }
      }}
      className={cn('justify-center rounded-full', className)}
      style={StyleSheet.flatten([
        {
          width: sizeStyle.width,
          height: sizeStyle.height,
          backgroundColor: currentBgColor,
          borderRadius: sizeStyle.height / 2,
          padding: (sizeStyle.height - sizeStyle.thumbSize) / 2,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ])}
    >
      <View
        style={{
          width: sizeStyle.thumbSize,
          height: sizeStyle.thumbSize,
          borderRadius: sizeStyle.thumbSize / 2,
          backgroundColor: '#ffffff',
          transform: [
            {
              translateX: state.isSelected
                ? sizeStyle.width - sizeStyle.thumbSize - (sizeStyle.height - sizeStyle.thumbSize)
                : 0,
            },
          ],
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
          elevation: 2,
        }}
      />
    </Pressable>
  )
}

Switch.displayName = 'Switch'
