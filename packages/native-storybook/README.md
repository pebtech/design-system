# @pebtech/native-storybook

Expo app that runs [Storybook for React Native](https://storybookjs.github.io/react-native/) for `@pebtech/ui-native`.

## Prerequisites

- Node.js 22+
- pnpm 10+
- iOS Simulator (macOS) or Android emulator / device
- Xcode (iOS) or Android Studio (Android) for **development builds**
- `pnpm -r run build` (or at least `@pebtech/tokens` built)

## Development build (recommended)

This app uses [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/) (`expo-dev-client`), not Expo Go.

### First-time setup

From the repo root, build and install the native app on a simulator or device:

```bash
pnpm install
pnpm --filter @pebtech/native-storybook run run:ios
# or
pnpm --filter @pebtech/native-storybook run run:android
```

`expo run:ios` / `expo run:android` runs `prebuild` when needed, compiles native code, and installs the app with bundle id `com.pebtech.native-storybook`.

### Daily workflow

```bash
pnpm storybook:native
```

Then press `i` (iOS) or `a` (Android) to open the installed development build. Metro serves Storybook on port 8081.

Rebuild the native app when you add or upgrade native dependencies:

```bash
pnpm --filter @pebtech/native-storybook run run:ios
```

### Xcode 26.4+

iOS builds include a config plugin (`plugins/withFmtXcode26Fix.js`) that patches the `fmt` pod for stricter Clang in recent Xcode versions. If you delete `ios/`, run `pnpm --filter @pebtech/native-storybook run prebuild` before building again.

## Stories

Stories live next to components in `packages/ui-native/src/**/*.stories.tsx`.

## Regenerate story index

If stories are missing after adding files:

```bash
pnpm --filter @pebtech/native-storybook run storybook-generate
```

Metro also regenerates `storybook.requires.ts` on start when using `withStorybook`.
