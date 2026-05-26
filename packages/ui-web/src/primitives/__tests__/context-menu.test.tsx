import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from '../context-menu'

describe('ContextMenu', () => {
  it('does not show content by default', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Right-click me</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    expect(screen.getByText('Right-click me')).toBeInTheDocument()
    expect(screen.queryByText('Cut')).not.toBeInTheDocument()
  })

  it('opens on right-click (contextmenu event)', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Right-click me</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Right-click me'))
    expect(screen.getByText('Cut')).toBeInTheDocument()
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('renders menu items with menuitem role', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Action 1</ContextMenuItem>
          <ContextMenuItem>Action 2</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    const items = screen.getAllByRole('menuitem')
    expect(items).toHaveLength(2)
  })

  it('calls onClick and closes when item is clicked', () => {
    const onClick = vi.fn()
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={onClick}>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    fireEvent.click(screen.getByText('Delete'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })

  it('does not call onClick when item is disabled', () => {
    const onClick = vi.fn()
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={onClick} disabled>
            Disabled Item
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    fireEvent.click(screen.getByText('Disabled Item'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders separator with separator role', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Item 2</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('closes when Escape key is pressed', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    expect(screen.getByText('Item')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByText('Item')).not.toBeInTheDocument()
  })

  it('renders menu container with role="menu"', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Action</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })
})
