import { render } from '@testing-library/react'
import { Pagination, PaginationPrevious, PaginationNext, PaginationList, PaginationPage } from '../../navigation/pagination'

describe('Pagination', () => {
  it('renders a nav element', () => {
    const { container } = render(
      <Pagination>
        <PaginationPrevious />
        <PaginationList>
          <PaginationPage current>1</PaginationPage>
          <PaginationPage>2</PaginationPage>
        </PaginationList>
        <PaginationNext />
      </Pagination>
    )
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('renders previous and next buttons', () => {
    const { getByLabelText } = render(
      <Pagination>
        <PaginationPrevious />
        <PaginationNext />
      </Pagination>
    )
    expect(getByLabelText('Previous page')).toBeInTheDocument()
    expect(getByLabelText('Next page')).toBeInTheDocument()
  })
})
