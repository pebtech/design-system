# @pebtech/ui-native

React Native UI components for the design system. **Phase 2 — gated on NativeWind v5 reaching stable.**

## Current Status

Provides:
- `ThemeProvider` / `useTheme` — token-aware theme context using `@pebtech/tokens`
- `cn()` utility — clsx wrapper for conditional class composition

## Architecture Constraints

### Tailwind v4 vs NativeWind v5

The web package (`@pebtech/ui-web`) uses Tailwind CSS v4 which is Rust-compiled, CSS-first, and relies on CSS custom properties (`var(--text-primary)`, `@theme` blocks). React Native has no DOM and no native CSS custom properties.

NativeWind v5 (preview) attempts to bridge this by mapping Tailwind classes to React Native styles, but it is built on the Tailwind v3 architecture. Until NativeWind v5 fully supports Tailwind v4's `@theme` syntax, **you cannot share styling configs directly between web and native**.

**What IS shared**: Token *values* via `@pebtech/tokens` (TypeScript objects). The `generate-css.mjs` script compiles these to CSS for web; native consumes them as JS objects via `useTheme()`.

**What is NOT shared**: The styling mechanism. Web uses utility classes resolved by Tailwind's CSS engine. Native uses either NativeWind class mapping or direct `StyleSheet.create()` with token values.

### Token Consumption Patterns

**Web** (className-driven):
```tsx
<div className="bg-surface text-primary rounded-xl" />
```

**Native with NativeWind** (when v5 is stable):
```tsx
<View className="bg-surface text-primary rounded-xl" />
```

**Native without NativeWind** (current fallback):
```tsx
const { tokens } = useTheme()
<View style={{ backgroundColor: tokens.bg.surface, borderRadius: 12 }} />
```

The goal is option 2 (NativeWind className parity). Option 3 is the interim fallback.

### Headless UI is Web-Only

`@pebtech/ui-web` relies on `@headlessui/react` for accessible state management (focus trapping, ARIA roles, keyboard navigation) in Combobox, Listbox, Dialog, Drawer, Dropdown, etc.

Headless UI does not support React Native. For native equivalents, the team will need:
- **`react-native-aria`** (Adobe's accessibility primitives for RN), or
- **Custom state machines** per component

The web and native component APIs should be aligned (same prop names, same variant options) even though the internals differ. This is an intentional design trade-off — attempting to unify the runtime would add cross-platform complexity that outweighs the benefit.

## When to Populate

Begin populating this package when:
1. NativeWind v5 reaches stable release with Tailwind v4 support
2. A mobile product actively needs shared components
3. `react-native-aria` (or equivalent) is evaluated for accessible state management
