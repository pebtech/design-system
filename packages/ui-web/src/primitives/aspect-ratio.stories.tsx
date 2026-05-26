import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { AspectRatio } from './aspect-ratio'

const meta = {
  title: 'Primitives/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Square: Story = {
  args: {
    ratio: 1,
    children: (
      <div className="flex items-center justify-center bg-zinc-100 text-zinc-500 w-full h-full">
        1:1 Square
      </div>
    ),
    className: 'w-64 rounded-lg border border-zinc-200',
  },
}

export const Video: Story = {
  args: {
    ratio: 16 / 9,
    children: (
      <div className="flex items-center justify-center bg-zinc-100 text-zinc-500 w-full h-full">
        16:9 Video Aspect Ratio
      </div>
    ),
    className: 'w-96 rounded-lg border border-zinc-200',
  },
}
