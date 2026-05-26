import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../hover-card'

// Mock react-aria's Overlay so content renders without portal issues in test
vi.mock('react-aria', async () => {
  const actual = await vi.importActual('react-aria')
  return {
    ...actual,
    Overlay: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

describe('HoverCard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not show content by default', () => {
    render(
      <HoverCard>
        <HoverCardTrigger>
          <button>Hover me</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>Card content</p>
        </HoverCardContent>
      </HoverCard>
    )

    expect(screen.getByText('Hover me')).toBeInTheDocument()
    expect(screen.queryByText('Card content')).not.toBeInTheDocument()
  })

  it('shows content after hover delay', () => {
    render(
      <HoverCard openDelay={300}>
        <HoverCardTrigger>
          <button>Hover me</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>Card content</p>
        </HoverCardContent>
      </HoverCard>
    )

    fireEvent.mouseEnter(screen.getByText('Hover me'))

    // Content should not appear immediately
    expect(screen.queryByText('Card content')).not.toBeInTheDocument()

    // Advance past the delay
    act(() => {
      vi.advanceTimersByTime(350)
    })

    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('hides content after mouse leave delay', () => {
    render(
      <HoverCard openDelay={0} closeDelay={200}>
        <HoverCardTrigger>
          <button>Hover me</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>Card content</p>
        </HoverCardContent>
      </HoverCard>
    )

    // Open the card
    fireEvent.mouseEnter(screen.getByText('Hover me'))
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(screen.getByText('Card content')).toBeInTheDocument()

    // Trigger mouse leave
    fireEvent.mouseLeave(screen.getByText('Hover me'))

    // Should still be visible immediately
    expect(screen.getByText('Card content')).toBeInTheDocument()

    // Advance past close delay
    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(screen.queryByText('Card content')).not.toBeInTheDocument()
  })

  it('renders trigger children', () => {
    render(
      <HoverCard>
        <HoverCardTrigger>
          <span>Trigger element</span>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>Content</p>
        </HoverCardContent>
      </HoverCard>
    )

    expect(screen.getByText('Trigger element')).toBeInTheDocument()
  })

  it('can be controlled via isOpen prop', () => {
    render(
      <HoverCard isOpen>
        <HoverCardTrigger>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>Always visible</p>
        </HoverCardContent>
      </HoverCard>
    )

    expect(screen.getByText('Always visible')).toBeInTheDocument()
  })
})
