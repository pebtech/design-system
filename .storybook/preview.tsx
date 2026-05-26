import type { Decorator, Preview } from '@storybook/react'
import React from 'react'
import '../packages/ui-web/src/styles/tailwind.css'

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as 'light' | 'dark'
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-body text-primary p-8">
        <Story />
      </div>
    </div>
  )
}

const preview: Preview = {
  decorators: [withTheme],
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
    layout: 'centered',
    options: {
      storySort: {
        order: [
          'Foundations',
          'Primitives',
          'Typography',
          'Layout',
          'Data Display',
          'Forms',
          'Feedback',
          'Navigation',
        ],
      },
    },
  },
}

export default preview
