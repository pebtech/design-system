import { render, screen, fireEvent } from '@testing-library/react'
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

  it('renders a tablist role', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={() => {}} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders tab roles for each tab', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={() => {}} />)
    const tabElements = screen.getAllByRole('tab')
    expect(tabElements).toHaveLength(3)
  })

  it('marks the active tab with aria-selected', () => {
    render(<Tabs tabs={tabs} activeTab="tab2" onChange={() => {}} />)
    const tabElements = screen.getAllByRole('tab')
    expect(tabElements[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabElements[1]).toHaveAttribute('aria-selected', 'true')
    expect(tabElements[2]).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onChange when a tab is clicked', () => {
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={onChange} />)
    fireEvent.click(screen.getByText('Second'))
    expect(onChange).toHaveBeenCalledWith('tab2')
  })

  it('handles arrow key navigation', () => {
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={onChange} />)
    const tablist = screen.getByRole('tablist')
    fireEvent.keyDown(tablist, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith('tab2')
  })

  it('wraps around with ArrowRight on last tab', () => {
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} activeTab="tab3" onChange={onChange} />)
    const tablist = screen.getByRole('tablist')
    fireEvent.keyDown(tablist, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith('tab1')
  })

  it('wraps around with ArrowLeft on first tab', () => {
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={onChange} />)
    const tablist = screen.getByRole('tablist')
    fireEvent.keyDown(tablist, { key: 'ArrowLeft' })
    expect(onChange).toHaveBeenCalledWith('tab3')
  })

  it('navigates to first tab with Home key', () => {
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} activeTab="tab3" onChange={onChange} />)
    const tablist = screen.getByRole('tablist')
    fireEvent.keyDown(tablist, { key: 'Home' })
    expect(onChange).toHaveBeenCalledWith('tab1')
  })

  it('navigates to last tab with End key', () => {
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={onChange} />)
    const tablist = screen.getByRole('tablist')
    fireEvent.keyDown(tablist, { key: 'End' })
    expect(onChange).toHaveBeenCalledWith('tab3')
  })

  it('sets tabIndex correctly for roving tabindex', () => {
    render(<Tabs tabs={tabs} activeTab="tab2" onChange={() => {}} />)
    const tabElements = screen.getAllByRole('tab')
    expect(tabElements[0]).toHaveAttribute('tabIndex', '-1')
    expect(tabElements[1]).toHaveAttribute('tabIndex', '0')
    expect(tabElements[2]).toHaveAttribute('tabIndex', '-1')
  })

  describe('segmented variant', () => {
    it('renders a tablist role', () => {
      render(<Tabs tabs={tabs} activeTab="tab1" onChange={() => {}} variant="segmented" />)
      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('renders tab roles for each tab', () => {
      render(<Tabs tabs={tabs} activeTab="tab1" onChange={() => {}} variant="segmented" />)
      const tabElements = screen.getAllByRole('tab')
      expect(tabElements).toHaveLength(3)
    })

    it('calls onChange when a segmented tab is clicked', () => {
      const onChange = vi.fn()
      render(<Tabs tabs={tabs} activeTab="tab1" onChange={onChange} variant="segmented" />)
      fireEvent.click(screen.getByText('Second'))
      expect(onChange).toHaveBeenCalledWith('tab2')
    })
  })
})
