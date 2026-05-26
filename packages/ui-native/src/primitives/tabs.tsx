import { Pressable, ScrollView, View, StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any

interface Tab {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
  style?: ViewStyle
  variant?: 'underlined' | 'segmented'
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  style,
  variant = 'underlined',
}: TabsProps) {
  const { tokens } = useTheme()

  if (variant === 'segmented') {
    return (
      <TypedView
        className={cn(className)}
        style={StyleSheet.flatten([
          {
            flexDirection: 'row',
            padding: 4,
            borderRadius: 12,
            backgroundColor: tokens.bg.secondary ?? '#f4f4f5',
          },
          style,
        ])}
        accessibilityRole="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <TypedPressable
              key={tab.id}
              onPress={() => onChange(tab.id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              style={{
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 8,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isActive
                  ? tokens.bg.surface ?? '#ffffff'
                  : 'transparent',
                ...(isActive && {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }),
              }}
            >
              <TypedView style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text
                  size="xs"
                  weight="semibold"
                  color={isActive ? 'brand' : 'secondary'}
                >
                  {tab.label}
                </Text>
                {tab.count !== undefined && (
                  <Text
                    size="xs"
                    color={isActive ? 'brand' : 'secondary'}
                  >
                    {tab.count}
                  </Text>
                )}
              </TypedView>
            </TypedPressable>
          )
        })}
      </TypedView>
    )
  }

  // Underlined variant (default)
  return (
    <TypedView
      className={cn(className)}
      style={StyleSheet.flatten([
        {
          borderBottomWidth: 1,
          borderBottomColor: tokens.border.primary ?? '#e4e4e7',
        },
        style,
      ])}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row', gap: 16 }}
        accessibilityRole="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <TypedPressable
              key={tab.id}
              onPress={() => onChange(tab.id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 4,
                borderBottomWidth: 2,
                borderBottomColor: isActive
                  ? tokens.text.brand ?? '#4f46e5'
                  : 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Text
                size="sm"
                weight="medium"
                color={isActive ? 'brand' : 'muted'}
              >
                {tab.label}
              </Text>
              {tab.count !== undefined && (
                <TypedView
                  style={{
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 9999,
                    backgroundColor: isActive
                      ? (tokens.text.brand ?? '#4f46e5') + '1A'
                      : tokens.bg.secondary ?? '#f4f4f5',
                  }}
                >
                  <Text
                    size="xs"
                    color={isActive ? 'brand' : 'muted'}
                  >
                    {tab.count}
                  </Text>
                </TypedView>
              )}
            </TypedPressable>
          )
        })}
      </ScrollView>
    </TypedView>
  )
}
