import { render, screen } from '@testing-library/react'
import { Dropdown, DropdownButton } from '../../primitives/dropdown'

describe('DropdownButton', () => {
  it('renders a button', () => {
    render(
      <Dropdown>
        <DropdownButton>Menu</DropdownButton>
      </Dropdown>
    )
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument()
  })
})
