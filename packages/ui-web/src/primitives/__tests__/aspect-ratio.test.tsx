import React from 'react'
import { render } from '@testing-library/react'
import { AspectRatio } from '../aspect-ratio'

describe('AspectRatio', () => {
  it('renders a div with default ratio', () => {
    const { container } = render(<AspectRatio />)
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    expect((container.firstChild as HTMLElement).style.aspectRatio).toBe('1')
  })

  it('applies the custom ratio', () => {
    const { container } = render(<AspectRatio ratio={16 / 9} />)
    expect((container.firstChild as HTMLElement).style.aspectRatio).toBe('1.7777777777777777')
  })

  it('applies custom className', () => {
    const { container } = render(<AspectRatio className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
