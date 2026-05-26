import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from './menubar'

const meta = {
  title: 'Primitives/Menubar',
  component: Menubar,
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex justify-center p-12">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => console.log('New')}>New File</MenubarItem>
            <MenubarItem onClick={() => console.log('Open')}>Open</MenubarItem>
            <MenubarItem onClick={() => console.log('Save')}>Save</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => console.log('Exit')}>Exit</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => console.log('Undo')}>Undo</MenubarItem>
            <MenubarItem onClick={() => console.log('Redo')}>Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => console.log('Cut')}>Cut</MenubarItem>
            <MenubarItem onClick={() => console.log('Copy')}>Copy</MenubarItem>
            <MenubarItem onClick={() => console.log('Paste')}>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => console.log('Zoom In')}>Zoom In</MenubarItem>
            <MenubarItem onClick={() => console.log('Zoom Out')}>Zoom Out</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => console.log('Full Screen')}>Full Screen</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  ),
}

export const WithDisabledItems: Story = {
  render: () => (
    <div className="flex justify-center p-12">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarItem disabled>Open Recent</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Save</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled>Undo</MenubarItem>
            <MenubarItem disabled>Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Preferences</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  ),
}
