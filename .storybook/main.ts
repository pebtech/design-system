import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../packages/ui-web/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/ui-web/src/**/*.mdx',
    '../packages/icons/stories/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    const iconsDist = path.resolve(__dirname, '../packages/icons/dist')

    config.plugins = [...(config.plugins || []), tailwindcss()]
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@ds-storybook': path.resolve(__dirname),
        // Prefer pre-built dist so Storybook never compiles 7k-line Solar source modules.
        '@pebtech/icons/outline': path.join(iconsDist, 'outline.mjs'),
        '@pebtech/icons/solid': path.join(iconsDist, 'solid.mjs'),
        '@pebtech/icons/solar/linear': path.join(iconsDist, 'solar/linear.mjs'),
        '@pebtech/icons/solar/outline': path.join(iconsDist, 'solar/outline.mjs'),
        '@pebtech/icons/solar/bold': path.join(iconsDist, 'solar/bold.mjs'),
        '@pebtech/icons/solar/broken': path.join(iconsDist, 'solar/broken.mjs'),
        '@pebtech/icons/solar/duotone': path.join(iconsDist, 'solar/duotone.mjs'),
      },
    }
    // Allow IconExplorer to glob Solar SVG assets outside the story file tree.
    config.server = {
      ...config.server,
      fs: {
        ...config.server?.fs,
        allow: [
          ...(config.server?.fs?.allow ?? []),
          path.resolve(__dirname, '..'),
        ],
      },
    }
    return config
  },
}

export default config
