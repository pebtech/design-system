import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationList,
  PaginationPage,
  PaginationSimple,
  getPaginationRange,
} from '../../navigation/pagination'

describe('getPaginationRange', () => {
  it('returns all pages when total fits max visible', () => {
    expect(getPaginationRange(2, 4, 5)).toEqual([1, 2, 3, 4])
  })

  it('includes gaps for long ranges', () => {
    expect(getPaginationRange(10, 20, 5)).toEqual([
      1,
      'gap-start',
      9,
      10,
      11,
      'gap-end',
      20,
    ])
  })
})

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
      </Pagination>,
    )
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('renders previous and next buttons', () => {
    render(
      <Pagination>
        <PaginationPrevious />
        <PaginationNext />
      </Pagination>,
    )
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
  })

  it('applies appearance via context', () => {
    const { container } = render(
      <Pagination appearance="solid" data-testid="nav">
        <PaginationList>
          <PaginationPage current>1</PaginationPage>
        </PaginationList>
      </Pagination>,
    )
    expect(container.querySelector('nav')).toHaveClass('rounded-lg')
  })
})

describe('PaginationSimple', () => {
  it('shows page x of y and navigates', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    render(
      <PaginationSimple page={2} totalPages={5} onPageChange={onPageChange} />,
    )

    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()

    await user.click(screen.getByLabelText('Next page'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })
})
