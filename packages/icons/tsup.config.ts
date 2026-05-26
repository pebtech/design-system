import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/outline.ts', 'src/solid.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: true,
  external: ['react'],
})
