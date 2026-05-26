import { render, screen } from '@testing-library/react'
import { Tooltip } from '../../primitives/tooltip'

describe('Tooltip', () => {
  it('renders without crashing', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <Tooltip text="Info">
        <span>Trigger</span>
      </Tooltip>
    )
    expect(screen.getByText('Trigger')).toBeInTheDocument()
  })
})
