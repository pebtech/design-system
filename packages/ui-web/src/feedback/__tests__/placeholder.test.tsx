import { render, screen } from '@testing-library/react'
import { Placeholder } from '../../feedback/placeholder'

describe('Placeholder', () => {
  it('renders title text', () => {
    render(<Placeholder title="No data" />)
    expect(screen.getByText('No data')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<Placeholder title="Empty" description="Nothing here" />)
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<Placeholder><button>Action</button></Placeholder>)
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
  })
})
