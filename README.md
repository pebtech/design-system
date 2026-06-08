# PEB Design System

Shared, versioned libraries for PEB product apps. Published to GitHub Packages as **`@pebtech/*`**.

> **On GitHub Packages**, each package shows its own README (`packages/<name>/README.md`). Use the links below for install and usage per package.

## Packages

| Package | Install | Documentation |
|---------|---------|----------------|
| `@pebtech/ui-web` | Web React components (Tailwind 4) | [README](packages/ui-web/README.md) |
| `@pebtech/tokens` | Design tokens (JS + CSS) | [README](packages/tokens/README.md) |
| `@pebtech/icons` | SVG icons (web + React Native) | [README](packages/icons/README.md) |
| `@pebtech/hooks` | Shared React hooks | [README](packages/hooks/README.md) |
| `@pebtech/ui-native` | React Native primitives (preview) | [README](packages/ui-native/README.md) |
| `@pebtech/native-storybook` | Expo app for native component stories (not published) | [README](packages/native-storybook/README.md) |

---

## Using in your application

Typical **Next.js** app setup (see [ui-web README](packages/ui-web/README.md) for details).

### 1. Registry and auth

**Project** `.npmrc`:

```ini
@pebtech:registry=https://npm.pkg.github.com
```

**User** `~/.npmrc` (do not commit):

```ini
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

PAT needs `read:packages` on the `pebtech` org.

### 2. Install

```bash
pnpm add @pebtech/ui-web @pebtech/tokens
pnpm add react react-dom tailwindcss @headlessui/react react-aria react-stately date-fns
```

Optional: `@pebtech/icons`, `@pebtech/hooks`.

### 3. Tailwind CSS 4

`src/styles/tailwind.css`:

```css
@import "tailwindcss";
@import "@pebtech/ui-web/styles";
@source "../node_modules/@pebtech/ui-web/dist";
@custom-variant dark (&:where(.dark, .dark *));
```

### 4. Providers

```tsx
import { LinkProvider, BrandProvider } from '@pebtech/ui-web'
import Link from 'next/link'

<LinkProvider component={Link}>
  <BrandProvider brandColor="#6366f1">
    {children}
  </BrandProvider>
</LinkProvider>
```

### 5. Components

```tsx
import { Button, Input, Heading, Text } from '@pebtech/ui-web'
import { ArrowLeftOutline } from '@pebtech/icons/outline'
import { useDebounce } from '@pebtech/hooks'
```

---

## Monorepo development

For contributors cloning **this repository** (not required for app consumers).

### Prerequisites

- Node.js 22+
- pnpm 10+
- `read:packages` / `write:packages` for publish

### Setup

```bash
git clone https://github.com/pebtech/design-system.git
cd design-system
pnpm install
pnpm -r run build
```

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm -r run build` | Build all packages |
| `pnpm -r run test` | Unit tests (Vitest) |
| `pnpm -r run typecheck` | TypeScript |
| `pnpm -r run lint` | ESLint |
| `pnpm storybook` | Web component docs at http://localhost:6006 (`ui-web` + icons) |
| `pnpm storybook:native` | Native Storybook dev server (`ui-native`) — see [native-storybook README](packages/native-storybook/README.md) |
| `pnpm storybook:native:ios` | Build/install iOS development client for native Storybook |
| `pnpm storybook:native:android` | Build/install Android development client for native Storybook |
| `pnpm changeset` | Record a version bump |
| `pnpm release` | Build + publish (CI does this on `main`) |

`@pebtech/tokens` builds first; `ui-web` and `ui-native` depend on it.

### Adding a component

1. Add under `packages/ui-web/src/`
2. Export from `packages/ui-web/src/index.ts`
3. Add `.stories.tsx` and `__tests__/*.test.tsx` (web: `ui-web`; native: `ui-native` + run via `pnpm storybook:native`)
4. `pnpm -r run build && pnpm -r run test`

### Adding an icon

1. Add `.svg` to `packages/icons/svgs/outline/` or `solid/`
2. `pnpm --filter @pebtech/icons run build`

### Versioning

[Changesets](https://github.com/changesets/changesets) — independent package versions. Breaking token changes bump dependents via `updateInternalDependencies: "minor"`.

---

## Architecture (overview)

```
packages/
  tokens/     Source of truth → dist/css/tokens.css
  ui-web/     React + Tailwind 4 components
  ui-native/  React Native (preview)
  native-storybook/  Expo host for ui-native Storybook
  hooks/      Framework-agnostic hooks
  icons/      svgr pipeline (web + native)
```

- **Tokens** → `generate-css.mjs` writes CSS used by `ui-web` and Storybook.
- **Components** → Tailwind utilities + React Aria / Headless UI peers; tree-shakeable (`sideEffects: false`).
- **Do not edit** `packages/ui-web/src/styles/tailwind.css` by hand — regenerate from tokens.

Stack split in `ui-web`: overlays/menus often use **react-aria**; many form inputs use **@headlessui/react**. See source imports for the current map.

---

## CI/CD and security

- **PRs:** frozen lockfile, audit, build, lint, typecheck, tests, Storybook a11y, size limits
- **Release:** Changesets on `main` → GitHub Packages (`@pebtech/*`)
- **Dependabot:** weekly updates; npm version PRs delayed **7 days** (`cooldown` in `.github/dependabot.yml`)
- **Hardening:** `onlyBuiltDependencies` allow-list, dependency overrides, no tokens in committed `.npmrc`

---

## Project structure

```
design-system/
  .github/workflows/   ci.yml, release.yml
  .storybook/          Storybook
  packages/
    tokens/
    ui-web/
    ui-native/
    hooks/
    icons/
  CODEOWNERS
```

Full layout and deprecation policy live in git history and package READMEs; extend this doc when onboarding contributors.
