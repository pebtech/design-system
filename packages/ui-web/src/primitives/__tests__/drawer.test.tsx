import { render, screen } from '@testing-library/react'
import { Drawer, DrawerTitle } from '../../primitives/drawer'

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
})
