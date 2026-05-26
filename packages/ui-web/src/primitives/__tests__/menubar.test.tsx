import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from '../menubar'

describe('Menubar', () => {
  it('renders with menubar role', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    expect(screen.getByRole('menubar')).toBeInTheDocument()
    expect(screen.getByText('File')).toBeInTheDocument()
  })

  it('does not show submenu content by default', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New File</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    expect(screen.queryByText('New File')).not.toBeInTheDocument()
  })

  it('opens submenu when trigger is clicked', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New File</MenubarItem>
            <MenubarItem>Open</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    fireEvent.click(screen.getByText('File'))
    expect(screen.getByText('New File')).toBeInTheDocument()
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('closes submenu when trigger is clicked again', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New File</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    fireEvent.click(screen.getByText('File'))
    expect(screen.getByText('New File')).toBeInTheDocument()

    fireEvent.click(screen.getByText('File'))
    expect(screen.queryByText('New File')).not.toBeInTheDocument()
  })

  it('calls onClick when menu item is clicked', () => {
    const onClick = vi.fn()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={onClick}>Save</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    fireEvent.click(screen.getByText('File'))
    fireEvent.click(screen.getByText('Save'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders separator with separator role', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Copy</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    fireEvent.click(screen.getByText('Edit'))
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('does not call onClick for disabled items', () => {
    const onClick = vi.fn()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={onClick} disabled>Redo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    fireEvent.click(screen.getByText('Edit'))
    fireEvent.click(screen.getByText('Redo'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders trigger with aria-haspopup', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    const trigger = screen.getByText('File')
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
  })

  it('renders multiple menus', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Copy</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    expect(screen.getByText('File')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })
})
