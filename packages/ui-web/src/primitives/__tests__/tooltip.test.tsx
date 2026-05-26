import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tooltip } from '../tooltip'

describe('Tooltip', () => {
  it('renders without crashing', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <Tooltip text="Info">
        <span>Trigger</span>
      </Tooltip>
    )
    expect(screen.getByText('Trigger')).toBeInTheDocument()
  })

  it('does not show tooltip text by default', () => {
    render(
      <Tooltip text="Hidden tip">
        <button>Hover</button>
      </Tooltip>
    )
    expect(screen.queryByText('Hidden tip')).not.toBeInTheDocument()
  })

  it('shows tooltip on mouse enter', () => {
    render(
      <Tooltip text="Visible tip">
        <button>Hover</button>
      </Tooltip>
    )

    fireEvent.mouseEnter(screen.getByText('Hover'))
    expect(screen.getByText('Visible tip')).toBeInTheDocument()
  })

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip text="Disappearing tip">
        <button>Hover</button>
      </Tooltip>
    )

    const trigger = screen.getByText('Hover')
    fireEvent.mouseEnter(trigger)
    expect(screen.getByText('Disappearing tip')).toBeInTheDocument()

    fireEvent.mouseLeave(trigger)
    expect(screen.queryByText('Disappearing tip')).not.toBeInTheDocument()
  })

  it('shows tooltip on focus', () => {
    render(
      <Tooltip text="Focus tip">
        <button>Focus me</button>
      </Tooltip>
    )

    fireEvent.focus(screen.getByText('Focus me'))
    expect(screen.getByText('Focus tip')).toBeInTheDocument()
  })

  it('hides tooltip on blur', () => {
    render(
      <Tooltip text="Blur tip">
        <button>Focus me</button>
      </Tooltip>
    )

    const trigger = screen.getByText('Focus me')
    fireEvent.focus(trigger)
    expect(screen.getByText('Blur tip')).toBeInTheDocument()

    fireEvent.blur(trigger)
    expect(screen.queryByText('Blur tip')).not.toBeInTheDocument()
  })

  it('renders with role="tooltip" when visible', () => {
    render(
      <Tooltip text="ARIA tooltip">
        <button>Trigger</button>
      </Tooltip>
    )

    fireEvent.mouseEnter(screen.getByText('Trigger'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('does not show tooltip when text is empty', () => {
    render(
      <Tooltip text="">
        <button>No tip</button>
      </Tooltip>
    )

    fireEvent.mouseEnter(screen.getByText('No tip'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('sets aria-describedby on trigger when visible', () => {
    render(
      <Tooltip text="Accessible tip">
        <button>Trigger</button>
      </Tooltip>
    )

    const trigger = screen.getByText('Trigger')
    expect(trigger).not.toHaveAttribute('aria-describedby')

    fireEvent.mouseEnter(trigger)
    expect(trigger).toHaveAttribute('aria-describedby')
  })

  it('falls back to span wrapper for non-element children', () => {
    render(<Tooltip text="String tip">Just text</Tooltip>)
    const trigger = screen.getByText('Just text')
    expect(trigger.tagName).toBe('SPAN')

    fireEvent.mouseEnter(trigger)
    expect(screen.getByText('String tip')).toBeInTheDocument()
  })
})
