import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: [
    '../packages/ui-web/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/ui-web/src/**/*.mdx',
    '../packages/icons/src/**/*.stories.@(ts|tsx|mdx)',
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
    config.plugins = [...(config.plugins || []), tailwindcss()]
    return config
  },
}

export default config
