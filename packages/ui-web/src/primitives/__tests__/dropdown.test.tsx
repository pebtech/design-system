import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownLabel,
  DropdownSection,
  DropdownHeading,
} from '../../primitives/dropdown'

describe('Dropdown', () => {
  it('renders a trigger button', () => {
    render(
      <Dropdown>
        <DropdownButton as="button">Menu</DropdownButton>
      </Dropdown>
    )
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument()
  })

  it('has aria-haspopup on the trigger', () => {
    render(
      <Dropdown>
        <DropdownButton as="button">Menu</DropdownButton>
      </Dropdown>
    )
    const trigger = screen.getByRole('button', { name: /menu/i })
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
  })

  it('shows menu on click', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown>
        <DropdownButton as="button">Menu</DropdownButton>
        <DropdownMenu>
          <DropdownItem onClick={() => {}}>
            <DropdownLabel>Edit</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )

    // Menu should not be visible initially
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    // Click to open
    await user.click(screen.getByRole('button', { name: /menu/i }))

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('closes menu when clicking an item', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Dropdown>
        <DropdownButton as="button">Menu</DropdownButton>
        <DropdownMenu>
          <DropdownItem onClick={onClick}>
            <DropdownLabel>Edit</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: /menu/i }))
    await user.click(screen.getByText('Edit'))

    expect(onClick).toHaveBeenCalled()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('renders a divider', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown>
        <DropdownButton as="button">Menu</DropdownButton>
        <DropdownMenu>
          <DropdownItem onClick={() => {}}>
            <DropdownLabel>First</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => {}}>
            <DropdownLabel>Second</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: /menu/i }))
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('renders sections and headings', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown>
        <DropdownButton as="button">Menu</DropdownButton>
        <DropdownMenu>
          <DropdownSection>
            <DropdownHeading>Actions</DropdownHeading>
            <DropdownItem onClick={() => {}}>
              <DropdownLabel>Edit</DropdownLabel>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: /menu/i }))
    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('sets aria-expanded on trigger', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown>
        <DropdownButton as="button">Menu</DropdownButton>
        <DropdownMenu>
          <DropdownItem onClick={() => {}}>
            <DropdownLabel>Edit</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )

    const trigger = screen.getByRole('button', { name: /menu/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('handles disabled items', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Dropdown>
        <DropdownButton as="button">Menu</DropdownButton>
        <DropdownMenu>
          <DropdownItem onClick={onClick} disabled>
            <DropdownLabel>Disabled Item</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: /menu/i }))
    await user.click(screen.getByText('Disabled Item'))

    expect(onClick).not.toHaveBeenCalled()
  })
})
