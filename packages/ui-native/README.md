# @pebtech/ui-native

React Native UI primitives for the PEB design system. **Preview / Phase 2** — gated on NativeWind v5 stable.

## Install

```ini
@pebtech:registry=https://npm.pkg.github.com
```

```bash
pnpm add @pebtech/ui-native @pebtech/tokens
pnpm add react react-native nativewind react-stately
```

Peers: `react` `^18 || ^19`, `react-native` `>=0.76`, `nativewind` `>=5.0.0-preview.1`.

## Usage

```tsx
import { ThemeProvider, useTheme, Button, Input } from '@pebtech/ui-native'

export function App() {
  return (
    <ThemeProvider mode="light">
      <Screen />
    </ThemeProvider>
  )
}

function Screen() {
  const { tokens } = useTheme()
  return (
    <>
      <Button onPress={() => {}}>Continue</Button>
      <Input placeholder="Email" />
    </>
  )
}
```

Styling uses token values via `useTheme()` or NativeWind `className` when v5 is stable.

## With @pebtech/icons

```tsx
import { ArrowLeftOutline } from '@pebtech/icons/outline'
```

Metro resolves the native build automatically.

## Developing this package

```bash
pnpm --filter @pebtech/ui-native run build
```

See [repository README](../../README.md#monorepo-development).

---

## Architecture notes

### Tailwind v4 (web) vs NativeWind v5 (native)

Web (`@pebtech/ui-web`) uses Tailwind CSS 4 and CSS custom properties. React Native has no DOM — native consumes **token JS objects** from `@pebtech/tokens` via `ThemeProvider`, not shared Tailwind config files.

**Shared:** token values. **Not shared (yet):** utility-class styling until NativeWind v5 supports Tailwind v4 `@theme`.

### Headless UI is web-only

`@pebtech/ui-web` uses Headless UI / React Aria for accessibility. Native uses `react-native-aria` and custom primitives instead.
