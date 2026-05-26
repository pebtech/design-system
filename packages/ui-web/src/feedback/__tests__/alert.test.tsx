import { render, screen } from '@testing-library/react'
import { Alert, AlertTitle } from '../../feedback/alert'

describe('Alert', () => {
  it('renders content when open', () => {
    render(
      <Alert open={true} onClose={() => {}}>
        <AlertTitle>Warning</AlertTitle>
        <p>Alert body</p>
      </Alert>
    )
    expect(screen.getByText('Warning')).toBeInTheDocument()
    expect(screen.getByText('Alert body')).toBeInTheDocument()
  })
})
