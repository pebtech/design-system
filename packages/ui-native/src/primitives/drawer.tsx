import React, { createContext, useMemo, useEffect } from 'react'
import {
  Modal,
  Pressable,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  ViewStyle,
  ScrollView,
} from 'react-native'
import { useTheme } from '../providers/theme-provider'
import { Text } from './text'
import { cn } from '../utils/cn'

const TypedPressable = Pressable as any
const TypedView = View as any
const TypedAnimatedView = Animated.View as any
const TypedScrollView = ScrollView as any

const DrawerContext = createContext<{ onClose?: () => void }>({})

const SCREEN_WIDTH = Dimensions.get('window').width

const sizeWidths: Record<string, number> = {
  xs: 0.55,
  sm: 0.65,
  md: 0.75,
  lg: 0.8,
  xl: 0.85,
  '2xl': 0.9,
}

export interface DrawerProps {
  open: boolean
  onClose: (open: boolean) => void
  size?: keyof typeof sizeWidths
  children: React.ReactNode
  className?: string
  contentClassName?: string
  style?: ViewStyle
}

export function Drawer({
  open,
  onClose,
  size = 'md',
  children,
  className,
  contentClassName,
  style,
  ...props
}: DrawerProps) {
  const { tokens } = useTheme()
  const drawerWidth = SCREEN_WIDTH * (sizeWidths[size] ?? 0.75)
  const slideAnim = useMemo(() => new Animated.Value(drawerWidth), [drawerWidth])
  const backdropAnim = useMemo(() => new Animated.Value(0), [])

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: drawerWidth,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [open, slideAnim, backdropAnim, drawerWidth])

  const handleClose = () => onClose(false)

  return (
    <Modal
      transparent
      visible={open}
      onRequestClose={handleClose}
      animationType="none"
      {...props}
    >
      {/* Backdrop */}
      <TypedAnimatedView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: backdropAnim,
        }}
      >
        <TypedPressable style={{ flex: 1 }} onPress={handleClose} />
      </TypedAnimatedView>

      {/* Drawer Panel */}
      <TypedAnimatedView
        style={StyleSheet.flatten([
          {
            position: 'absolute',
            top: 12,
            bottom: 12,
            right: 12,
            width: drawerWidth,
            transform: [{ translateX: slideAnim }],
            backgroundColor: tokens.bg.surface ?? '#ffffff',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: tokens.border.primary ?? '#e4e4e7',
            shadowColor: '#000',
            shadowOffset: { width: -2, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 10,
          },
          style,
        ])}
        className={cn(className)}
      >
        <TypedScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator
          className={cn(contentClassName)}
        >
          <DrawerContext.Provider value={{ onClose: handleClose }}>
            {children}
          </DrawerContext.Provider>
        </TypedScrollView>
      </TypedAnimatedView>
    </Modal>
  )
}

export function DrawerTitle({ children, className, style, ...props }: any) {
  const { tokens } = useTheme()
  return (
    <Text
      weight="semibold"
      size="lg"
      style={StyleSheet.flatten([
        { color: tokens.text.primary ?? '#18181b', marginBottom: 4 },
        style,
      ])}
      className={className}
      {...props}
    >
      {children}
    </Text>
  )
}

export function DrawerDescription({ children, className, style, ...props }: any) {
  const { tokens } = useTheme()
  return (
    <Text
      weight="normal"
      size="sm"
      style={StyleSheet.flatten([
        { color: tokens.text.secondary ?? '#71717a', marginBottom: 16 },
        style,
      ])}
      className={className}
      {...props}
    >
      {children}
    </Text>
  )
}

export function DrawerBody({ children, className, style, ...props }: any) {
  return (
    <TypedView className={cn('my-4', className)} style={style} {...props}>
      {children}
    </TypedView>
  )
}

export function DrawerActions({ children, className, style, ...props }: any) {
  return (
    <TypedView
      className={cn('flex-row items-center justify-end gap-3 mt-6', className)}
      style={style}
      {...props}
    >
      {children}
    </TypedView>
  )
}

export function DrawerHeader({ children, className, style, ...props }: any) {
  return (
    <TypedView
      className={cn('flex-row items-center justify-between mb-2', className)}
      style={style}
      {...props}
    >
      {children}
    </TypedView>
  )
}
