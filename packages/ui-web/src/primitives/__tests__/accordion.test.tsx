import { render, screen } from '@testing-library/react'
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

  it('renders children content', () => {
    render(
      <AccordionSection id="sec1" title="Section Title" isOpen={true} onToggle={() => {}}>
        <div>Body content</div>
      </AccordionSection>
    )
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })
})
