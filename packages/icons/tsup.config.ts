import { defineConfig } from 'tsup'

/**
 * Per-icon dist files. Each icon source becomes its own `dist/generated/.../*.mjs`
 * so consumer bundlers (Vite/webpack/Metro) get true per-icon tree-shaking even
 * when the package scales to thousands of icons.
 *
 * With `splitting: true`, the shared `SvgIcon` / `SvgIconNative` wrapper is
 * extracted into a single chunk that's paid once per consumer bundle —
 * regardless of how many icons they import.
 *
 * Subpath exports in package.json's `exports` map allow direct deep imports
 * (`@eniolayo/icons/outline/arrow-left`) for guaranteed-minimal bundles.
 *
 * Solar entries (`src/solar.ts`, `src/solar/*.tsx`) are emitted on the same
 * pass — when `assets/icons/solar/` is empty those globs match nothing and
 * are silently skipped, so the default build stays fast for non-Solar users.
 */
export default defineConfig([
  {
    entry: [
      'src/index.ts',
      'src/outline.ts',
      'src/solid.ts',
      'src/icon.tsx',
      'src/generated/outline/*.tsx',
      'src/generated/solid/*.tsx',
      'src/solar.ts',
      'src/solar/*.tsx',
      'src/solar/names.ts',
      '!src/solar/*.native.tsx',
    ],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    treeshake: true,
    splitting: true,
    external: ['react'],
  },
  {
    entry: [
      'src/index.native.ts',
      'src/outline.native.ts',
      'src/solid.native.ts',
      'src/icon.native.tsx',
      'src/generated/outline-native/*.tsx',
      'src/generated/solid-native/*.tsx',
      'src/solar.native.ts',
      'src/solar/*.native.tsx',
    ],
    format: ['esm', 'cjs'],
    dts: true,
    clean: false,
    treeshake: true,
    splitting: true,
    external: ['react', 'react-native', 'react-native-svg'],
  },
])
