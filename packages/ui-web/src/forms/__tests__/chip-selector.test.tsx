import { render, screen } from '@testing-library/react'
import { ChipSelector } from '../../forms/chip-selector'

describe('ChipSelector', () => {
  it('renders all options', () => {
    render(<ChipSelector value="" onChange={() => {}} options={['Red', 'Blue', 'Green']} />)
    expect(screen.getByText('Red')).toBeInTheDocument()
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Green')).toBeInTheDocument()
  })

  it('renders radio inputs for single selection', () => {
    const { container } = render(
      <ChipSelector value="Red" onChange={() => {}} options={['Red', 'Blue']} />
    )
    const radios = container.querySelectorAll('input[type="radio"]')
    expect(radios.length).toBe(2)
  })

  it('renders checkbox inputs for multiple selection', () => {
    const { container } = render(
      <ChipSelector value={['Red']} onChange={() => {}} options={['Red', 'Blue']} multiple />
    )
    const checkboxes = container.querySelectorAll('input[type="checkbox"]')
    expect(checkboxes.length).toBe(2)
  })
})
