import { render, screen } from '@testing-library/react'
import { Tabs } from '../../primitives/tabs'

const tabs = [
  { id: 'tab1', label: 'First' },
  { id: 'tab2', label: 'Second' },
  { id: 'tab3', label: 'Third' },
]

describe('Tabs', () => {
  it('renders a button for each tab', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={() => {}} />)
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
  })

  it('renders tab count when provided', () => {
    const tabsWithCount = [{ id: 'tab1', label: 'First', count: 5 }]
    render(<Tabs tabs={tabsWithCount} activeTab="tab1" onChange={() => {}} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})
