import type { Decorator } from '@storybook/react'
import React from 'react'

export type CanvasSize = 'default' | 'wide' | 'full' | false

const maxWidthClass: Record<Exclude<CanvasSize, false | 'full'>, string> = {
  default: 'max-w-3xl',
  wide: 'max-w-5xl',
}

/**
 * Gives block-level components (Progress, Table, Input, etc.) a real width.
 * Storybook's `centered` layout shrinks to content — Progress only has `w-full`,
 * so it collapses to ~0px without this wrapper.
 */
export const withStoryCanvas: Decorator = (Story, { parameters }) => {
  const canvas = (parameters.canvas ?? 'default') as CanvasSize

  if (canvas === false || parameters.layout === 'fullscreen') {
    return <Story />
  }

  if (canvas === 'full') {
    return (
      <div className="w-full min-w-0">
        <Story />
      </div>
    )
  }

  return (
    <div className={`w-full min-w-[min(100%,18rem)] ${maxWidthClass[canvas]} mx-auto`}>
      <Story />
    </div>
  )
}
