import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'

const reactNativeMock = fileURLToPath(
  new URL('./src/__tests__/react-native-mock.ts', import.meta.url),
)
const ariaMock = fileURLToPath(
  new URL('./src/__tests__/aria-mock.ts', import.meta.url),
)

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
  resolve: {
    alias: [
      // Vitest runs in Node, not under a React Native runtime. The mocks below
      // provide just enough surface area for our `index.ts` import-shape test
      // to load every primitive without exploding on native-only globals or
      // pulling in dependency chains that hard-require react-native at module
      // scope.
      { find: /^react-native$/, replacement: reactNativeMock },
      { find: /^react-native-aria$/, replacement: ariaMock },
      { find: /^@react-native-aria\/.*/, replacement: ariaMock },
      { find: /^react-stately$/, replacement: ariaMock },
    ],
  },
})
