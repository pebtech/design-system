import { render } from '@testing-library/react'
import { Progress } from '../../primitives/progress'

describe('Progress', () => {
  it('renders without crashing', () => {
    const { container } = render(<Progress value={50} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders inner bar with default indigo color class', () => {
    const { container } = render(<Progress value={50} />)
    const bar = container.querySelector('.bg-indigo-600')
    expect(bar).toBeInTheDocument()
  })

  it('applies green color class', () => {
    const { container } = render(<Progress value={50} color="green" />)
    const bar = container.querySelector('.bg-green-600')
    expect(bar).toBeInTheDocument()
  })
})
