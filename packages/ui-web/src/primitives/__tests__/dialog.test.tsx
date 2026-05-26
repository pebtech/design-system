import { render, screen } from '@testing-library/react'
import { Dialog, DialogTitle } from '../../primitives/dialog'

describe('Dialog', () => {
  it('renders content when open', () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>My Dialog</DialogTitle>
        <p>Dialog body</p>
      </Dialog>
    )
    expect(screen.getByText('My Dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog body')).toBeInTheDocument()
  })

  it('has a dialog title', () => {
    render(
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>Test Title</DialogTitle>
      </Dialog>
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
