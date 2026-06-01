# @pebtech/native-storybook

Expo app that runs [Storybook for React Native](https://storybookjs.github.io/react-native/) for `@pebtech/ui-native`.

## Prerequisites

- Node.js 22+
- pnpm 10+
- iOS Simulator (macOS) or Android emulator / device
- `pnpm -r run build` (or at least `@pebtech/tokens` built)

## Run

From the repo root:

```bash
pnpm install
pnpm storybook:native
```

Then press `i` (iOS) or `a` (Android) in the Expo CLI, or scan the QR code with Expo Go.

Stories live next to components in `packages/ui-native/src/**/*.stories.tsx`.

## Regenerate story index

If stories are missing after adding files:

```bash
pnpm --filter @pebtech/native-storybook run storybook-generate
```

Metro also regenerates `storybook.requires.ts` on start when using `withStorybook`.
