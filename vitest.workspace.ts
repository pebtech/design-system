import { defineWorkspace } from 'vitest/config'

// ui-native is excluded because its components depend on React Native runtime
// (Animated, Dimensions, etc.) which can't be loaded in jsdom/node.
// ui-native tests run via its own vitest config with RN module mocks.
export default defineWorkspace([
  'packages/tokens',
  'packages/hooks',
  'packages/icons',
  'packages/ui-web',
  // 'packages/ui-native', // separate vitest config
])
