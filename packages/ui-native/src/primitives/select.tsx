import React, { useState } from 'react'
import { Pressable, View, Modal, FlatList, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  style?: ViewStyle
}

export function Select({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option...',
  disabled = false,
  invalid = false,
  className,
  style,
  ...props
}: SelectProps) {
  const { tokens, theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(controlledValue || defaultValue || '')

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue)
    }
  }, [controlledValue])

  const selectedOption = options.find((o) => o.value === selectedValue)

  const handleSelect = (val: string) => {
    if (controlledValue === undefined) {
      setSelectedValue(val)
    }
    onValueChange?.(val)
    setIsOpen(false)
  }

  const borderColor = invalid
    ? (tokens.text.error || '#ef4444')
    : (tokens.border.primary || '#e4e4e7')

  return (
    <>
      <TypedPressable
        disabled={disabled}
        onPress={() => setIsOpen(true)}
        className={cn('flex-row items-center justify-between border rounded-lg px-3 py-2.5 text-base bg-white dark:bg-zinc-900', className)}
        style={StyleSheet.flatten([
          {
            borderColor,
            opacity: disabled ? 0.6 : 1,
          },
          style,
        ])}
        {...props}
      >
        <Text
          style={{
            color: selectedOption ? (tokens.text.primary || '#18181b') : (tokens.text.muted || '#a1a1aa'),
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        {/* Simple chevron indicator */}
        <View
          style={{
            width: 8,
            height: 8,
            borderRightWidth: 1.5,
            borderBottomWidth: 1.5,
            borderColor: tokens.text.secondary || '#71717a',
            transform: [{ rotate: '45deg' }],
            marginRight: 4,
            marginTop: -2,
          }}
        />
      </TypedPressable>

      <Modal visible={isOpen} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={{
              width: '100%',
              maxHeight: '60%',
              backgroundColor: theme === 'dark' ? '#18181b' : '#ffffff',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: tokens.border.primary || '#e4e4e7',
            }}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const isItemSel = item.value === selectedValue
                return (
                  <Pressable
                    onPress={() => handleSelect(item.value)}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      backgroundColor: isItemSel ? (tokens.bg.brand || '#09090b') : 'transparent',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: isItemSel ? '#ffffff' : (tokens.text.primary || '#18181b'),
                        fontWeight: isItemSel ? '600' : '400',
                      }}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                )
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  )
}
