import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
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

    fireEvent.mouseEnter(screen.getByText('Hover').parentElement!)
    expect(screen.getByText('Visible tip')).toBeInTheDocument()
  })

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip text="Disappearing tip">
        <button>Hover</button>
      </Tooltip>
    )

    const wrapper = screen.getByText('Hover').parentElement!
    fireEvent.mouseEnter(wrapper)
    expect(screen.getByText('Disappearing tip')).toBeInTheDocument()

    fireEvent.mouseLeave(wrapper)
    expect(screen.queryByText('Disappearing tip')).not.toBeInTheDocument()
  })

  it('shows tooltip on focus', () => {
    render(
      <Tooltip text="Focus tip">
        <button>Focus me</button>
      </Tooltip>
    )

    fireEvent.focus(screen.getByText('Focus me').parentElement!)
    expect(screen.getByText('Focus tip')).toBeInTheDocument()
  })

  it('hides tooltip on blur', () => {
    render(
      <Tooltip text="Blur tip">
        <button>Focus me</button>
      </Tooltip>
    )

    const wrapper = screen.getByText('Focus me').parentElement!
    fireEvent.focus(wrapper)
    expect(screen.getByText('Blur tip')).toBeInTheDocument()

    fireEvent.blur(wrapper)
    expect(screen.queryByText('Blur tip')).not.toBeInTheDocument()
  })

  it('renders with role="tooltip" when visible', () => {
    render(
      <Tooltip text="ARIA tooltip">
        <button>Trigger</button>
      </Tooltip>
    )

    fireEvent.mouseEnter(screen.getByText('Trigger').parentElement!)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('does not show tooltip when text is empty', () => {
    render(
      <Tooltip text="">
        <button>No tip</button>
      </Tooltip>
    )

    fireEvent.mouseEnter(screen.getByText('No tip').parentElement!)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('sets aria-describedby on trigger when visible', () => {
    render(
      <Tooltip text="Accessible tip">
        <button>Trigger</button>
      </Tooltip>
    )

    const wrapper = screen.getByText('Trigger').parentElement!
    expect(wrapper).not.toHaveAttribute('aria-describedby')

    fireEvent.mouseEnter(wrapper)
    expect(wrapper).toHaveAttribute('aria-describedby')
  })
})
