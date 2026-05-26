/**
 * Minimal react-native stub so vitest (running in Node) can resolve and load
 * the ui-native package surface. The goal here is to verify that every public
 * primitive exports a valid value — not to faithfully render anything. Any
 * call site that needs richer behavior should still be tested under an actual
 * React Native runtime (Detox/Expo, etc.).
 */
import React from 'react'

type AnyProps = Record<string, unknown>

const passthrough = (props: AnyProps) =>
  React.createElement('div', props as Record<string, unknown>)

export const View = passthrough
export const Text = passthrough
export const Pressable = passthrough
export const TouchableOpacity = passthrough
export const TouchableHighlight = passthrough
export const TouchableWithoutFeedback = passthrough
export const ScrollView = passthrough
export const Modal = passthrough
export const Image = passthrough
export const TextInput = passthrough
export const Switch = passthrough
export const FlatList = passthrough
export const SectionList = passthrough
export const ActivityIndicator = passthrough
export const RefreshControl = passthrough
export const VirtualizedList = passthrough
export const KeyboardAvoidingView = passthrough
export const SafeAreaView = passthrough
export const StatusBar = passthrough

class AnimatedValue {
  private _value: number
  constructor(value: number) {
    this._value = value
  }
  setValue(value: number) {
    this._value = value
  }
  getValue() {
    return this._value
  }
  interpolate() {
    return this
  }
  addListener() {
    return ''
  }
  removeListener() {}
  removeAllListeners() {}
  stopAnimation() {}
  resetAnimation() {}
}

const noopAnimation = () => ({
  start: (cb?: (result: { finished: boolean }) => void) => cb?.({ finished: true }),
  stop: () => {},
  reset: () => {},
})

export const Animated = {
  View: passthrough,
  Text: passthrough,
  Image: passthrough,
  ScrollView: passthrough,
  FlatList: passthrough,
  Value: AnimatedValue,
  ValueXY: AnimatedValue,
  timing: noopAnimation,
  spring: noopAnimation,
  decay: noopAnimation,
  parallel: noopAnimation,
  sequence: noopAnimation,
  loop: noopAnimation,
  stagger: noopAnimation,
  delay: noopAnimation,
  event: () => () => {},
  createAnimatedComponent: <T,>(c: T) => c,
}

export const StyleSheet = {
  create: <T,>(s: T) => s,
  flatten: (s: unknown[] | unknown) =>
    Array.isArray(s) ? Object.assign({}, ...(s.filter(Boolean) as object[])) : s,
  hairlineWidth: 1,
  absoluteFill: {},
  absoluteFillObject: {},
  compose: (a: unknown, b: unknown) => [a, b],
}

export const Dimensions = {
  get: () => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),
  addEventListener: () => ({ remove: () => {} }),
  removeEventListener: () => {},
}

export const Platform = {
  OS: 'ios' as const,
  Version: 17,
  isPad: false,
  isTV: false,
  isTesting: true,
  select: <T,>(o: Record<string, T>) => o.ios ?? o.default,
}

export const LayoutAnimation = {
  configureNext: () => {},
  Presets: { easeInEaseOut: {}, linear: {}, spring: {} },
  create: () => ({}),
  Types: {
    spring: 'spring',
    linear: 'linear',
    easeInEaseOut: 'easeInEaseOut',
    easeIn: 'easeIn',
    easeOut: 'easeOut',
    keyboard: 'keyboard',
  },
  Properties: {
    opacity: 'opacity',
    scaleXY: 'scaleXY',
    scaleX: 'scaleX',
    scaleY: 'scaleY',
  },
}

export const UIManager = {
  setLayoutAnimationEnabledExperimental: () => {},
  measure: () => {},
  measureInWindow: () => {},
  measureLayout: () => {},
  getViewManagerConfig: () => null,
}

export const Keyboard = {
  dismiss: () => {},
  addListener: () => ({ remove: () => {} }),
  removeListener: () => {},
  removeAllListeners: () => {},
}

export const NativeModules: Record<string, unknown> = {}
export const NativeEventEmitter = class {
  addListener() {
    return { remove: () => {} }
  }
  removeAllListeners() {}
}

export const AppState = {
  currentState: 'active',
  addEventListener: () => ({ remove: () => {} }),
  removeEventListener: () => {},
}

export const Linking = {
  openURL: () => Promise.resolve(),
  canOpenURL: () => Promise.resolve(true),
  addEventListener: () => ({ remove: () => {} }),
  removeEventListener: () => {},
}

export const PixelRatio = {
  get: () => 2,
  getFontScale: () => 1,
  getPixelSizeForLayoutSize: (n: number) => n * 2,
  roundToNearestPixel: (n: number) => Math.round(n),
}

export const findNodeHandle = () => null
export const requireNativeComponent = () => passthrough

const defaultExport = {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  TextInput,
  Switch,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
  LayoutAnimation,
  UIManager,
  Keyboard,
  NativeModules,
  AppState,
  Linking,
  PixelRatio,
}

export default defaultExport
