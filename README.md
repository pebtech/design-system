# PEB Design System

A shared, versioned component library for PEB product applications. Distributed via GitHub Packages as `@peb/*` scoped npm packages.

## Packages

| Package | Description | Size (gzip) |
|---------|-------------|-------------|
| [`@peb/tokens`](packages/tokens/) | Design tokens — colors, typography, spacing, semantic light/dark themes, brand utilities | 2.2 KB |
| [`@peb/ui-web`](packages/ui-web/) | React web components — 43 components built on Headless UI + Tailwind CSS 4 | 23.6 KB |
| [`@peb/ui-native`](packages/ui-native/) | React Native components — theme provider + cn utility (Phase 2, gated on NativeWind v5 stable) | 375 B |
| [`@peb/hooks`](packages/hooks/) | Shared React hooks — useDebounce, useLocalStorage, useMediaQuery, useClickOutside, useIntersectionObserver | 1.0 KB |
| [`@peb/icons`](packages/icons/) | SVG icon library — outline + solid variants, tree-shakeable, Heroicons-style API | 196 B |

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm 10+
- GitHub personal access token with `read:packages` scope (for consuming), `write:packages` (for publishing)

### Install

```bash
git clone <repo-url> && cd design-system
pnpm install
```

### Build

```bash
pnpm -r run build
```

Build ordering is automatic — pnpm resolves `workspace:*` dependencies topologically. `@peb/tokens` builds first since `ui-web` and `ui-native` depend on it.

### Test

```bash
pnpm -r run test
```

68 unit tests across tokens, hooks, and ui-web packages using Vitest + Testing Library.

### Storybook

```bash
pnpm storybook
```

Opens at http://localhost:6006. Uses `@storybook/react-vite` with `@tailwindcss/vite` plugin for Tailwind CSS 4 support. Stories are co-located with components in `packages/ui-web/src/`.

### Type Check

```bash
pnpm -r run typecheck
```

---

## Architecture

```
design-system/
  packages/
    tokens/         Source of truth for all design tokens
    ui-web/         React web components (Tailwind CSS 4 + Headless UI)
    ui-native/      React Native components (NativeWind, Phase 2)
    hooks/          Framework-agnostic React hooks
    icons/          SVG icon library (svgr pipeline)
```

### Token Flow

1. **TypeScript objects** in `@peb/tokens/src/` define all color, typography, and spacing values
2. **`generate-css.mjs`** postbuild script produces `dist/css/tokens.css` with `@theme`, `:root`, and `.dark` blocks
3. **`@peb/ui-web`** exports this CSS at `@peb/ui-web/styles` for consumers to import
4. **Components** use Tailwind utility classes that resolve against the token CSS custom properties

### Component Conventions

- Components use `@headlessui/react` for accessible behavior (peer dep)
- Styling via Tailwind CSS 4 utility classes — no CSS-in-JS, no bundled CSS
- `cn()` utility (clsx + tailwind-merge) for class composition
- `data-slot` attributes on key elements for targeting in parent components
- `React.forwardRef` on interactive components
- All components are tree-shakeable (`sideEffects: false`)

---

## Package Details

### @peb/tokens

Design tokens extracted from the production apps. Provides:

- **Semantic tokens**: 90+ CSS custom properties for text, background, border, hover, focus, and input colors — both light and dark mode
- **Brand utilities**: `getColorShades()`, `hexToHSL()`, `hslToHex()` — pure functions for runtime brand color generation
- **CSS output**: `@peb/tokens/css` exports a ready-to-use CSS file with `@theme` block and `:root`/`.dark` variable definitions

```ts
import { lightTokens, darkTokens, getColorShades } from '@peb/tokens'
```

### @peb/ui-web

43 React components organized by category:

**Primitives**: Button, ButtonGroup, Badge, BadgeButton, Avatar, AvatarButton, Input, InputGroup, Select, Textarea, Checkbox, CheckboxField, CheckboxGroup, Switch, SwitchField, SwitchGroup, Radio, RadioField, RadioGroup, Divider, Skeleton, Progress, Slider, Tabs, Accordion, Tooltip, Dropdown, Dialog, Drawer, Table

**Typography**: Heading, Subheading, Text, TextLink, Strong, Code, Link

**Layout**: Card, DescriptionList, PageCard, PageBackButton, PageTopWrapper

**Data Display**: Stat, Stat2, Stat3, Stat4, EmptyState

**Forms**: Fieldset, FieldGroup, Field, Legend, Label, Description, ErrorMessage, Combobox, Listbox, DatePicker, DateRangePicker, ChipSelector, FormField

**Navigation**: Breadcrumb, Pagination, WizardStepper

**Feedback**: Alert, AlertTitle, AlertDescription, AlertBody, AlertActions, Placeholder

**Providers**: LinkProvider, BrandProvider

#### Framework Agnostic

The package does not depend on Next.js. Two provider patterns handle framework integration:

**LinkProvider** — wraps your framework's link component (e.g., `next/link`) so Button, Badge, and other components render framework-optimized links:

```tsx
import { LinkProvider } from '@peb/ui-web'
import NextLink from 'next/link'

<LinkProvider component={NextLink}>
  <App />
</LinkProvider>
```

**BrandProvider** — applies brand colors at runtime via CSS custom properties on `:root`:

```tsx
import { BrandProvider } from '@peb/ui-web'

<BrandProvider brandColor="#3b82f6">
  <App />
</BrandProvider>
```

#### Peer Dependencies

```
react ^18 || ^19
react-dom ^18 || ^19
@headlessui/react ^2.2
tailwindcss ^4.0
date-fns ^4.0
```

### @peb/hooks

Generic utility hooks with zero runtime dependencies:

| Hook | Description |
|------|-------------|
| `useDebounce(value, delay)` | Returns debounced value after delay |
| `useLocalStorage(key, initial)` | useState-like API backed by localStorage |
| `useMediaQuery(query)` | Returns boolean match state for CSS media query |
| `useClickOutside(ref, callback)` | Fires callback on clicks outside ref element |
| `useIntersectionObserver(options?)` | Returns `{ ref, isIntersecting }` |

### @peb/icons

Self-managed SVG icon library. Drop `.svg` files in `svgs/outline/` or `svgs/solid/`, run `pnpm --filter @peb/icons run build`, and get typed React components.

```tsx
import { ArrowLeft } from '@peb/icons/outline'
import { Check } from '@peb/icons/solid'

<ArrowLeft size={20} color="currentColor" strokeWidth={1.5} />
<Check size={16} />
```

**Icon props**: `size`, `color`, `strokeWidth`, `className`, `title` (accessibility), plus all SVG attributes via spread.

### @peb/ui-native

Phase 2 — gated on NativeWind v5 reaching stable. Currently provides:

- `ThemeProvider` / `useTheme` — token-aware theme context using `@peb/tokens`
- `cn()` utility — clsx wrapper for class composition

---

## Consumer Integration

### 1. Configure registry

Add to your project's `.npmrc`:

```ini
@peb:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. Install packages

```bash
pnpm add @peb/tokens @peb/ui-web @peb/hooks @peb/icons
```

### 3. Import styles

In your CSS entry point (e.g., `src/styles/tailwind.css`):

```css
@import "tailwindcss";
@import "@peb/ui-web/styles";
@source "../node_modules/@peb/ui-web/dist";
@custom-variant dark (&:where(.dark, .dark *));
```

**`@source` is mandatory** — Tailwind CSS 4 excludes `node_modules` from automatic class detection. Without this directive, Tailwind classes used inside `@peb/ui-web` components won't appear in the output CSS.

### 4. Set up providers

```tsx
import { LinkProvider, BrandProvider } from '@peb/ui-web'
import NextLink from 'next/link'

export default function RootLayout({ children }) {
  return (
    <LinkProvider component={NextLink}>
      <BrandProvider brandColor={workspace.brandColor}>
        {children}
      </BrandProvider>
    </LinkProvider>
  )
}
```

### 5. Use components

```tsx
import { Button, Badge, Input, Heading, Text } from '@peb/ui-web'
import { ArrowLeft } from '@peb/icons/outline'
import { useDebounce } from '@peb/hooks'
```

---

## Development

### Adding a new component

1. Create the component in the appropriate directory under `packages/ui-web/src/`
2. Export it from `packages/ui-web/src/index.ts`
3. Write a co-located `.stories.tsx` file
4. Write a co-located `__tests__/*.test.tsx` file
5. Run `pnpm -r run build && pnpm -r run test`

### Adding a new icon

1. Add the `.svg` file to `packages/icons/svgs/outline/` and/or `packages/icons/svgs/solid/`
2. Run `pnpm --filter @peb/icons run build` — the generate script creates typed React components automatically
3. Icons are auto-exported from `@peb/icons/outline` and `@peb/icons/solid`

### Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for versioning.

```bash
pnpm changeset          # Create a changeset (describe what changed)
pnpm version-packages   # Apply changesets to bump versions + update changelogs
pnpm release            # Build + publish all changed packages
```

Each package is independently versioned. A breaking change in `@peb/tokens` cascades as at least a minor bump to dependent packages (`updateInternalDependencies: "minor"`).

### Deprecation Policy

1. Add `@deprecated` JSDoc tag + `console.warn` in dev mode. Ship as a **minor** version.
2. Minimum one minor version cycle for consumers to migrate.
3. Remove in the next **major** version. Changeset must reference the deprecation minor.

---

## CI/CD

### PR Checks (`.github/workflows/ci.yml`)

- Lockfile integrity (`--frozen-lockfile`)
- Dependency audit (`pnpm audit --audit-level=high`)
- Dependency review (new vuln detection on PRs)
- Build, lint, typecheck, test, bundle size check

### Release (`.github/workflows/release.yml`)

- Triggered on push to `main`
- Changesets action creates a "Version Packages" PR or publishes when that PR merges
- Build attestation via `actions/attest-build-provenance`

### Security

- `.npmrc` hardened: `auto-install-peers=false`, `resolution-mode=highest`
- `pnpm.onlyBuiltDependencies` allow-list in `package.json`
- `pnpm.peerDependencyRules.allowedVersions` for React 19 compatibility
- Dependabot configured for weekly GitHub Actions SHA bumps + npm dependency updates
- No lifecycle scripts in published packages
- `CODEOWNERS` gates reviews on package.json and barrel export changes

---

## Project Structure

```
design-system/
  .changeset/             Changesets config
  .github/
    dependabot.yml        Automated dependency updates
    workflows/
      ci.yml              PR quality gates
      release.yml         Publish pipeline
  .storybook/             Storybook config (react-vite + tailwindcss/vite)
  packages/
    tokens/
      src/
        colors.ts         Color palette definitions
        typography.ts     Font family tokens
        semantic.ts       Light/dark semantic token mappings
        brand-utils.ts    Brand color shade generation
        brands/           Brand presets
      scripts/
        generate-css.mjs  Postbuild CSS generation
    ui-web/
      src/
        primitives/       Core UI components (button, input, checkbox, etc.)
        typography/       Text, heading, link components
        layout/           Card, page wrappers, description list
        data-display/     Stat, empty state, data table
        forms/            Combobox, listbox, date picker, chip selector
        navigation/       Breadcrumb, pagination, wizard stepper
        feedback/         Alert, placeholder
        providers/        LinkProvider, BrandProvider
        utils/            cn(), TouchTarget
        styles/           Tailwind CSS entry point
    ui-native/
      src/
        providers/        ThemeProvider (token-aware)
        utils/            cn()
    hooks/
      src/                5 utility hooks
    icons/
      svgs/               Source SVG files (outline + solid)
      scripts/            svgr generation script
      src/                Generated React icon components
  CODEOWNERS              Gated review rules
  tsconfig.base.json      Shared TypeScript config
  vitest.workspace.ts     Test workspace config
```
