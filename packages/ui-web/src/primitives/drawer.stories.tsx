import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Drawer, DrawerTitle, DrawerDescription, DrawerBody, DrawerActions, DrawerHeader } from './drawer'
import { Button } from './button'

const meta = {
  title: 'Primitives/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <Button preset="ghost" variants={{ size: 'sm' }} onClick={() => setOpen(false)}>
              Close
            </Button>
          </DrawerHeader>
          <DrawerDescription>
            This is a description of the drawer content.
          </DrawerDescription>
          <DrawerBody>
            <p style={{ fontSize: '14px', color: '#666' }}>
              This is the drawer body content. You can place any components or content here.
            </p>
          </DrawerBody>
          <DrawerActions>
            <Button preset="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </DrawerActions>
        </Drawer>
      </>
    )
  },
}

export const SmallSize: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Small Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} size="sm">
          <DrawerHeader>
            <DrawerTitle>Quick Settings</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <p style={{ fontSize: '14px', color: '#666' }}>
              A compact drawer for quick actions and settings.
            </p>
          </DrawerBody>
          <DrawerActions>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </DrawerActions>
        </Drawer>
      </>
    )
  },
}

export const LargeSize: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Large Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} size="2xl">
          <DrawerHeader>
            <DrawerTitle>Detailed View</DrawerTitle>
            <Button preset="ghost" variants={{ size: 'sm' }} onClick={() => setOpen(false)}>
              Close
            </Button>
          </DrawerHeader>
          <DrawerDescription>
            A larger drawer for viewing detailed content and complex forms.
          </DrawerDescription>
          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                  <h3 style={{ fontWeight: 600, marginBottom: '4px' }}>Item {i + 1}</h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    Description for item {i + 1}. This content demonstrates scrollable drawer body.
                  </p>
                </div>
              ))}
            </div>
          </DrawerBody>
          <DrawerActions>
            <Button preset="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </DrawerActions>
        </Drawer>
      </>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Edit Profile</Button>
        <Drawer open={open} onClose={() => setOpen(false)} size="md">
          <DrawerHeader>
            <DrawerTitle>Edit Profile</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription>Update your profile information below.</DrawerDescription>
          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Software developer and design enthusiast."
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
                />
              </div>
            </div>
          </DrawerBody>
          <DrawerActions>
            <Button preset="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save Profile</Button>
          </DrawerActions>
        </Drawer>
      </>
    )
  },
}
