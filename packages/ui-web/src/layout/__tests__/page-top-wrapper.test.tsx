import { render } from '@testing-library/react'
import { PageTopWrapper } from '../../layout/page-top-wrapper'

describe('PageTopWrapper', () => {
  it('renders without crashing', () => {
    const { container } = render(<PageTopWrapper>content</PageTopWrapper>)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders children', () => {
    const { getByText } = render(<PageTopWrapper>Wrapper content</PageTopWrapper>)
    expect(getByText('Wrapper content')).toBeInTheDocument()
  })
})
