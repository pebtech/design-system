import type { Decorator, Preview } from '@storybook/react'
import React from 'react'
import '../packages/ui-web/src/styles/tailwind.css'
import { withStoryCanvas } from './decorators'

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as 'light' | 'dark'
  const fullscreen = context.parameters.layout === 'fullscreen'
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div
        className={
          fullscreen
            ? 'min-h-screen bg-body font-sans text-primary antialiased'
            : 'min-h-screen bg-body font-sans text-primary p-8 antialiased'
        }
      >
        <Story />
      </div>
    </div>
  )
}

const preview: Preview = {
  decorators: [withTheme, withStoryCanvas],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  parameters: {
    // `padded` + withStoryCanvas: block components get a real width (Progress, tables, inputs).
    layout: 'padded',
    canvas: 'default',
    controls: {
      expanded: true,
    },
    options: {
      storySort: {
        order: [
          'Icons',
          'Foundations',
          'Primitives',
          'Typography',
          'Layout',
          'Data Display',
          'Forms',
          'Feedback',
          'Navigation',
          ['Playground', '*'],
        ],
      },
    },
  },
}

export default preview
