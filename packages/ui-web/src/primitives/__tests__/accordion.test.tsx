import { render, screen, fireEvent } from '@testing-library/react'
import { AccordionSection } from '../../primitives/accordion'

describe('AccordionSection', () => {
  it('renders the title', () => {
    render(
      <AccordionSection id="sec1" title="Section Title" isOpen={false} onToggle={() => {}}>
        <div>Body</div>
      </AccordionSection>
    )
    expect(screen.getByText('Section Title')).toBeInTheDocument()
  })

  it('renders a toggle button', () => {
    render(
      <AccordionSection id="sec1" title="Section Title" isOpen={false} onToggle={() => {}}>
        <div>Body</div>
      </AccordionSection>
    )
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('renders children content when open', () => {
    render(
      <AccordionSection id="sec1" title="Section Title" isOpen={true} onToggle={() => {}}>
        <div>Body content</div>
      </AccordionSection>
    )
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('calls onToggle when the button is clicked', () => {
    const onToggle = vi.fn()
    render(
      <AccordionSection id="sec1" title="Section Title" isOpen={false} onToggle={onToggle}>
        <div>Body</div>
      </AccordionSection>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('renders icon when provided', () => {
    render(
      <AccordionSection
        id="sec1"
        title="Section Title"
        isOpen={false}
        onToggle={() => {}}
        icon={<span data-testid="icon">🔒</span>}
      >
        <div>Body</div>
      </AccordionSection>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders action when provided', () => {
    render(
      <AccordionSection
        id="sec1"
        title="Section Title"
        isOpen={true}
        onToggle={() => {}}
        action={<button data-testid="action-btn">Action</button>}
      >
        <div>Body</div>
      </AccordionSection>
    )
    expect(screen.getByTestId('action-btn')).toBeInTheDocument()
  })

  it('action click does not trigger toggle', () => {
    const onToggle = vi.fn()
    render(
      <AccordionSection
        id="sec1"
        title="Section Title"
        isOpen={true}
        onToggle={onToggle}
        action={<button data-testid="action-btn">Action</button>}
      >
        <div>Body</div>
      </AccordionSection>
    )
    fireEvent.click(screen.getByTestId('action-btn'))
    expect(onToggle).not.toHaveBeenCalled()
  })

  it('applies transition classes based on open state', () => {
    const { container, rerender } = render(
      <AccordionSection id="sec1" title="Title" isOpen={false} onToggle={() => {}}>
        <div>Body</div>
      </AccordionSection>
    )
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-rows-[0fr]')
    expect(grid).toHaveClass('opacity-0')

    rerender(
      <AccordionSection id="sec1" title="Title" isOpen={true} onToggle={() => {}}>
        <div>Body</div>
      </AccordionSection>
    )
    expect(grid).toHaveClass('grid-rows-[1fr]')
    expect(grid).toHaveClass('opacity-100')
  })

  it('rotates chevron when open', () => {
    const { container, rerender } = render(
      <AccordionSection id="sec1" title="Title" isOpen={false} onToggle={() => {}}>
        <div>Body</div>
      </AccordionSection>
    )
    const svg = container.querySelector('svg')
    expect(svg).not.toHaveClass('rotate-180')

    rerender(
      <AccordionSection id="sec1" title="Title" isOpen={true} onToggle={() => {}}>
        <div>Body</div>
      </AccordionSection>
    )
    expect(svg).toHaveClass('rotate-180')
  })
})
