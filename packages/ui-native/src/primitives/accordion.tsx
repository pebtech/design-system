import React, { useMemo, useEffect } from 'react'
import {
  Animated,
  LayoutAnimation,
  Pressable,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any

interface AccordionSectionProps {
  // Reserved for parent-side keying / a11y; not consumed internally but kept
  // to mirror the web AccordionSection signature.
  id?: string
  title: string
  icon?: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
  action?: React.ReactNode
  className?: string
  style?: ViewStyle
}

function ChevronDown({ color, rotation }: { color: string; rotation: Animated.Value }) {
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <View style={{ width: 20, height: 20 }}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </View>
    </Animated.View>
  )
}

export function AccordionSection({
  id: _id,
  title,
  icon,
  isOpen,
  onToggle,
  children,
  action,
  className,
  style,
}: AccordionSectionProps) {
  const { tokens } = useTheme()
  // `isOpen` is intentionally only used as the initial value; subsequent
  // changes are driven by the useEffect below, so the dep array stays empty
  // to keep the Animated.Value identity stable across renders.
  const rotation = useMemo(() => new Animated.Value(isOpen ? 1 : 0), [])

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isOpen, rotation])

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    onToggle()
  }

  return (
    <TypedView
      className={cn(className)}
      style={StyleSheet.flatten([
        {
          overflow: 'hidden',
          backgroundColor: tokens.bg.surface ?? '#ffffff',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: tokens.border.primary ?? '#e4e4e7',
        },
        style,
      ])}
    >
      {/* Header */}
      <TypedView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
        }}
      >
        <TypedPressable
          onPress={handleToggle}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
          accessibilityRole="button"
          accessibilityState={{ expanded: isOpen }}
        >
          {icon && (
            <TypedView
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isOpen
                  ? (tokens.bg.brand ?? '#4f46e5') + '1A'
                  : tokens.hover.primary ?? '#f4f4f5',
              }}
            >
              {icon}
            </TypedView>
          )}
          <Text
            color="primary"
            weight="semibold"
            style={{ flex: 1 }}
          >
            {title}
          </Text>
          <ChevronDown
            color={tokens.text.muted ?? '#a1a1aa'}
            rotation={rotation}
          />
        </TypedPressable>
        {action && (
          <TypedView style={{ marginLeft: 8 }}>
            {action}
          </TypedView>
        )}
      </TypedView>

      {/* Content */}
      {isOpen && (
        <TypedView
          style={{
            borderTopWidth: 1,
            borderTopColor: tokens.border.primary ?? '#e4e4e7',
            padding: 24,
            paddingTop: 8,
          }}
        >
          {children}
        </TypedView>
      )}
    </TypedView>
  )
}
