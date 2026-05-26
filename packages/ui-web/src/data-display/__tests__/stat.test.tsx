import { render, screen } from '@testing-library/react'
import { Stat } from '../../data-display/stat'

describe('Stat', () => {
  it('renders title and value', () => {
    render(<Stat title="Revenue" value="$1,234" change="+12%" except="vs last month" />)
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$1,234')).toBeInTheDocument()
  })

  it('renders change badge', () => {
    render(<Stat title="Users" value="500" change="+5%" except="this week" />)
    expect(screen.getByText('+5%')).toBeInTheDocument()
  })
})
