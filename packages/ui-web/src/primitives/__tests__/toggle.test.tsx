import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Toggle } from '../toggle'

describe('Toggle', () => {
  it('renders a button with role togglebutton/button', () => {
    const { getByRole } = render(<Toggle>Toggle</Toggle>)
    const button = getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('can be toggled', () => {
    const onChange = vi.fn()
    const { getByRole } = render(<Toggle onChange={onChange}>Toggle</Toggle>)
    const button = getByRole('button')
    
    fireEvent.click(button)
    expect(onChange).toHaveBeenCalledWith(true)
    expect(button).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(button)
    expect(onChange).toHaveBeenCalledWith(false)
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('respects defaultSelected', () => {
    const { getByRole } = render(<Toggle defaultSelected>Toggle</Toggle>)
    const button = getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('handles isDisabled', () => {
    const onChange = vi.fn()
    const { getByRole } = render(<Toggle isDisabled onChange={onChange}>Toggle</Toggle>)
    const button = getByRole('button')
    expect(button).toBeDisabled()
    
    fireEvent.click(button)
    expect(onChange).not.toHaveBeenCalled()
  })
})
