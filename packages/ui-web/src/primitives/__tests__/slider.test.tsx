import { render } from '@testing-library/react'
import { Slider } from '../../primitives/slider'

describe('Slider', () => {
  it('renders a range input', () => {
    const { container } = render(<Slider value={[50]} />)
    const input = container.querySelector('input[type="range"]')
    expect(input).toBeInTheDocument()
  })

  it('sets min, max, step attributes', () => {
    const { container } = render(<Slider value={[25]} min={0} max={200} step={5} />)
    const input = container.querySelector('input[type="range"]') as HTMLInputElement
    expect(input.min).toBe('0')
    expect(input.max).toBe('200')
    expect(input.step).toBe('5')
  })
})
