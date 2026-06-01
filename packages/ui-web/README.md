# @pebtech/ui-web

React web components for the PEB design system — Tailwind CSS 4, React Aria, and Headless UI.

## Install

**Registry** — add to your app `.npmrc`:

```ini
@pebtech:registry=https://npm.pkg.github.com
```

Auth: `//npm.pkg.github.com/:_authToken=YOUR_PAT` in `~/.npmrc` (needs `read:packages` on the `pebtech` org).

```bash
pnpm add @pebtech/ui-web @pebtech/tokens
pnpm add react react-dom tailwindcss @headlessui/react react-aria react-stately date-fns
```

## Tailwind CSS 4

In your CSS entry (e.g. `src/styles/tailwind.css`):

```css
@import "tailwindcss";
@import "@pebtech/ui-web/styles";
@source "../node_modules/@pebtech/ui-web/dist";
@custom-variant dark (&:where(.dark, .dark *));
```

`@source` is required so Tailwind picks up classes used inside the library.

If you already have your own `@theme` tokens, you can use only `@source` (skip `@import "@pebtech/ui-web/styles"`) and rely on matching semantic CSS variables.

## Providers (Next.js example)

```tsx
import { LinkProvider, BrandProvider } from '@pebtech/ui-web'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LinkProvider component={Link}>
      <BrandProvider brandColor="#6366f1">
        {children}
      </BrandProvider>
    </LinkProvider>
  )
}
```

- **LinkProvider** — wires `next/link` (or your router) into link-style components.
- **BrandProvider** — sets brand CSS variables on `:root`.

## Use components

```tsx
import { Button, Input, Heading, Text, Card, Badge } from '@pebtech/ui-web'

export function Example() {
  return (
    <Card>
      <Heading>Dashboard</Heading>
      <Text color="secondary">Welcome back</Text>
      <Input placeholder="Search…" aria-label="Search" />
      <Button preset="default">Save</Button>
    </Card>
  )
}
```

## Peer dependencies

| Package | Version |
|---------|---------|
| `react` | `^18 \|\| ^19` |
| `react-dom` | `^18 \|\| ^19` |
| `tailwindcss` | `^4` |
| `@headlessui/react` | `^2` |
| `react-aria` | `^3` |
| `react-stately` | `^3` |
| `date-fns` | `^4` |

## Related packages

- [`@pebtech/icons`](../icons/README.md) — icons
- [`@pebtech/hooks`](../hooks/README.md) — shared hooks
- [`@pebtech/tokens`](../tokens/README.md) — design tokens

## Developing this package

Clone [pebtech/design-system](https://github.com/pebtech/design-system), then:

```bash
pnpm install
pnpm --filter @pebtech/ui-web run build
pnpm storybook
```

See the [repository README](../../README.md#monorepo-development) for the full monorepo workflow.
