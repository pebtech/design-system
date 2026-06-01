# @pebtech/tokens

Design tokens for PEB apps — colors, typography, spacing, and semantic light/dark themes.

## Install

```ini
# .npmrc in your app
@pebtech:registry=https://npm.pkg.github.com
```

```bash
pnpm add @pebtech/tokens
```

## Use in TypeScript

```ts
import { lightTokens, darkTokens, getColorShades } from '@pebtech/tokens'

const brand = getColorShades('#3b82f6')
```

## Use in CSS

```css
@import "tailwindcss";
@import "@pebtech/tokens/css";
```

Exports `dist/css/tokens.css` with `@theme`, `:root`, and `.dark` variable definitions.

## With @pebtech/ui-web

`ui-web` depends on tokens internally. Install `@pebtech/tokens` explicitly when you read token values in app code or import `@pebtech/tokens/css` without `ui-web`.

## Developing this package

```bash
git clone https://github.com/pebtech/design-system.git
cd design-system
pnpm install
pnpm --filter @pebtech/tokens run build
```

Edit `packages/tokens/src/` — CSS is regenerated on build. See [repository README](../../README.md#monorepo-development).
