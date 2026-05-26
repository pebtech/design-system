import { render, screen } from '@testing-library/react'
import { Drawer, DrawerTitle, DrawerDescription, DrawerBody, DrawerActions, DrawerHeader } from '../../primitives/drawer'

describe('Drawer', () => {
  it('renders content when open', () => {
    render(
      <Drawer open={true} onClose={() => {}}>
        <DrawerTitle>Drawer Title</DrawerTitle>
        <p>Drawer body</p>
      </Drawer>
    )
    expect(screen.getByText('Drawer Title')).toBeInTheDocument()
    expect(screen.getByText('Drawer body')).toBeInTheDocument()
  })

  it('does not render content when closed', () => {
    render(
      <Drawer open={false} onClose={() => {}}>
        <DrawerTitle>Drawer Title</DrawerTitle>
        <p>Drawer body</p>
      </Drawer>
    )
    expect(screen.queryByText('Drawer Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Drawer body')).not.toBeInTheDocument()
  })

  it('renders a dialog role element', () => {
    render(
      <Drawer open={true} onClose={() => {}}>
        <DrawerTitle>Test</DrawerTitle>
      </Drawer>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders DrawerDescription', () => {
    render(
      <Drawer open={true} onClose={() => {}}>
        <DrawerDescription>Some description</DrawerDescription>
      </Drawer>
    )
    expect(screen.getByText('Some description')).toBeInTheDocument()
  })

  it('renders DrawerBody content', () => {
    render(
      <Drawer open={true} onClose={() => {}}>
        <DrawerBody>
          <span>Body content here</span>
        </DrawerBody>
      </Drawer>
    )
    expect(screen.getByText('Body content here')).toBeInTheDocument()
  })

  it('renders DrawerActions', () => {
    render(
      <Drawer open={true} onClose={() => {}}>
        <DrawerActions>
          <button>Save</button>
        </DrawerActions>
      </Drawer>
    )
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('renders DrawerHeader with children', () => {
    render(
      <Drawer open={true} onClose={() => {}}>
        <DrawerHeader>
          <DrawerTitle>Header Title</DrawerTitle>
          <button>Close</button>
        </DrawerHeader>
      </Drawer>
    )
    expect(screen.getByText('Header Title')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('applies size class', () => {
    render(
      <Drawer open={true} onClose={() => {}} size="xl">
        <DrawerTitle>Sized Drawer</DrawerTitle>
      </Drawer>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('max-w-xl')
  })
})
