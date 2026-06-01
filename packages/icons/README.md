# @pebtech/icons

Tree-shakeable SVG icons for React web and React Native (same import paths).

## Install

```ini
@pebtech:registry=https://npm.pkg.github.com
```

```bash
pnpm add @pebtech/icons
pnpm add react  # peer: ^18 || ^19
```

**React Native / Expo** — also install:

```bash
pnpm add react-native-svg
```

## Usage (web)

```tsx
import { ArrowLeftOutline } from '@pebtech/icons/outline'
import { CheckSolid } from '@pebtech/icons/solid'

<ArrowLeftOutline size={20} color="currentColor" strokeWidth={1.5} />
```

## Usage (React Native)

Same imports — Metro uses the `react-native` export condition:

```tsx
import { ArrowLeftOutline } from '@pebtech/icons/outline'

<ArrowLeftOutline size={20} color="#171717" />
```

## Solar catalog

```tsx
import { Home2Linear } from '@pebtech/icons/solar/linear'
import { Home2Bold } from '@pebtech/icons/solar/bold'
```

Use **static** named imports only (no dynamic `import()` paths) so Metro/Vite can tree-shake.

## Deep imports (smallest bundle)

```tsx
import ArrowLeft from '@pebtech/icons/outline/arrow-left'
```

## Props

`size`, `color`, `strokeWidth`, `className` (web; no-op on RN unless using NativeWind), `title` (web a11y label).

## Developing this package

Add SVGs under `svgs/outline/` or `svgs/solid/`, then:

```bash
pnpm --filter @pebtech/icons run build
```

See [repository README](../../README.md#monorepo-development).
