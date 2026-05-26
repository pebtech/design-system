import { useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TypedAnimatedView = Animated.View as any

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

type TabLayout = { x: number; width: number }

// Indicator drives translateX with the native driver and width with the JS
// driver because RN does not support native-driven layout props like width.
function useTabIndicator(
  activeIndex: number,
  layoutsRef: React.MutableRefObject<Array<TabLayout | undefined>>,
  tabCount: number,
) {
  const translateX = useMemo(() => new Animated.Value(0), [])
  const widthAnim = useMemo(() => new Animated.Value(0), [])
  const hasInitializedRef = useRef(false)

  const animateTo = (layout: TabLayout, animated: boolean) => {
    if (!animated) {
      translateX.setValue(layout.x)
      widthAnim.setValue(layout.width)
      return
    }
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: layout.x,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(widthAnim, {
        toValue: layout.width,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start()
  }

  // Slide whenever the active tab changes and we already have a layout for it.
  useEffect(() => {
    const layout = layoutsRef.current[activeIndex]
    if (!layout) return
    animateTo(layout, hasInitializedRef.current)
    hasInitializedRef.current = true
    // animateTo intentionally not in deps — it captures stable refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  // Called from each tab's onLayout. Snaps to the active tab's position the
  // first time we have a measurement for it so the indicator doesn't fly in
  // from 0 on mount.
  const handleTabLayout = (index: number, layout: TabLayout) => {
    layoutsRef.current[index] = layout
    if (index === activeIndex && !hasInitializedRef.current) {
      animateTo(layout, false)
      hasInitializedRef.current = true
    } else if (index === activeIndex && hasInitializedRef.current) {
      // The active tab itself just remeasured (e.g. count changed); keep the
      // indicator pinned to it without animating from a stale position.
      animateTo(layout, true)
    }
  }

  // Reset initialization flag when the tab set changes shape entirely.
  useEffect(() => {
    hasInitializedRef.current = false
  }, [tabCount])

  return { translateX, widthAnim, handleTabLayout }
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

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === activeTab),
  )
  const layoutsRef = useRef<Array<TabLayout | undefined>>([])
  const { translateX, widthAnim, handleTabLayout } = useTabIndicator(
    activeIndex,
    layoutsRef,
    tabs.length,
  )

  if (variant === 'segmented') {
    return (
      <TypedView
        className={cn(className)}
        style={StyleSheet.flatten([
          {
            position: 'relative',
            flexDirection: 'row',
            padding: 4,
            borderRadius: 12,
            backgroundColor: tokens.bg.secondary ?? '#f4f4f5',
          },
          style,
        ])}
        accessibilityRole="tablist"
      >
        {/* Sliding pill behind the active tab */}
        <TypedAnimatedView
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 4,
            bottom: 4,
            left: 0,
            width: widthAnim,
            transform: [{ translateX }],
            borderRadius: 8,
            backgroundColor: tokens.bg.surface ?? '#ffffff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
            zIndex: 0,
          }}
        />
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id
          return (
            <TypedPressable
              key={tab.id}
              onPress={() => onChange(tab.id)}
              onLayout={(e: LayoutChangeEvent) => {
                const { x, width } = e.nativeEvent.layout
                handleTabLayout(index, { x, width })
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              style={{
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 8,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
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
        contentContainerStyle={{
          flexDirection: 'row',
          gap: 16,
          position: 'relative',
        }}
        accessibilityRole="tablist"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id
          return (
            <TypedPressable
              key={tab.id}
              onPress={() => onChange(tab.id)}
              onLayout={(e: LayoutChangeEvent) => {
                const { x, width } = e.nativeEvent.layout
                handleTabLayout(index, { x, width })
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 4,
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
        {/* Sliding underline; lives inside the ScrollView content so it tracks
            horizontal scroll alongside the tabs. */}
        <TypedAnimatedView
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 2,
            width: widthAnim,
            transform: [{ translateX }],
            backgroundColor: tokens.text.brand ?? '#4f46e5',
          }}
        />
      </ScrollView>
    </TypedView>
  )
}
