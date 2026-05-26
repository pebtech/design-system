import clsx from 'clsx'
import type React from 'react'
import { Button } from '../primitives/button'
import { Text } from '../typography/text'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '../primitives/dropdown'

export function Pagination({
  'aria-label': ariaLabel = 'Page navigation',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'nav'>) {
  return <nav aria-label={ariaLabel} {...props} className={clsx(className, 'flex gap-x-2')} />
}

interface PaginationButtonProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> {
  href?: string
  disabled?: boolean
}

export function PaginationPrevious({
  href = undefined,
  className,
  children = 'Previous',
  disabled,
  ...props
}: PaginationButtonProps) {
  const isLink = href && !disabled
  return (
    <span className={clsx(className, 'grow basis-0')}>
      <Button
        {...(props as any)}
        {...(isLink ? { href } : { disabled })}
        variants={{ variant: 'ghost', size: 'sm' }}
        aria-label="Previous page"
      >
        <svg className="stroke-current" data-slot="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {children}
      </Button>
    </span>
  )
}

export function PaginationNext({
  href = undefined,
  className,
  children = 'Next',
  disabled,
  ...props
}: PaginationButtonProps) {
  const isLink = href && !disabled
  return (
    <span className={clsx(className, 'flex grow basis-0 justify-end')}>
      <Button
        {...(props as any)}
        {...(isLink ? { href } : { disabled })}
        variants={{ variant: 'ghost', size: 'sm' }}
        aria-label="Next page"
      >
        {children}
        <svg className="stroke-current" data-slot="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </span>
  )
}

export function PaginationList({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx(className, 'hidden items-baseline gap-x-2 sm:flex')} />
}

export function PaginationPage({
  href = undefined,
  className,
  current = false,
  children,
  disabled,
  ...props
}: PaginationButtonProps & { current?: boolean }) {
  const isLink = href && !disabled
  return (
    <Button
      {...(props as any)}
      {...(isLink ? { href } : { disabled })}
      variants={{ variant: 'ghost', size: 'sm' }}
      aria-label={`Page ${children}`}
      aria-current={current ? 'page' : undefined}
      className={clsx(
        className,
        'min-w-9 before:absolute before:-inset-px before:rounded-lg',
        current && 'before:bg-primary/10 font-bold'
      )}
    >
      <span className="-mx-0.5">{children}</span>
    </Button>
  )
}

export function PaginationGap({
  className,
  children = <>&hellip;</>,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={clsx(className, 'w-9 text-center text-sm/6 font-semibold text-primary select-none')}
    >
      {children}
    </span>
  )
}

interface TablePaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  pageSize: number
  onPageSizeChange?: (size: number) => void
  itemName?: string
}

export function TablePagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  onPageSizeChange,
  itemName = 'results'
}: TablePaginationProps) {
  const startItem = Math.min((page - 1) * pageSize + 1, totalItems)
  const endItem = Math.min(page * pageSize, totalItems)

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationPage key={i} onClick={() => onPageChange(i)} current={page === i}>
            {i}
          </PaginationPage>
        )
      }
    } else {
      // Always show first page
      pages.push(
        <PaginationPage key={1} onClick={() => onPageChange(1)} current={page === 1}>
          1
        </PaginationPage>
      )

      if (page > 3) {
        pages.push(<PaginationGap key="start-gap" />)
      }

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)

      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationPage key={i} onClick={() => onPageChange(i)} current={page === i}>
            {i}
          </PaginationPage>
        )
      }

      if (page < totalPages - 2) {
        pages.push(<PaginationGap key="end-gap" />)
      }

      // Always show last page
      pages.push(
        <PaginationPage key={totalPages} onClick={() => onPageChange(totalPages)} current={page === totalPages}>
          {totalPages}
        </PaginationPage>
      )
    }

    return pages
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6 bg-tableBg border-t border-border">
      {/* Mobile view: simple pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          preset="secondary"
        >
          Previous
        </Button>
        <Button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          preset="secondary"
        >
          Next
        </Button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {onPageSizeChange && (
            <div className="flex items-center gap-2">
              <Text color="secondary" size="sm">Rows per Page</Text>
              <Dropdown>
                <DropdownButton as={Button} preset="outline" className="!py-1 !px-2 text-xs font-normal">
                  {pageSize}
                  {/* Down arrow icon (inline SVG replacing @iconify/react) */}
                  <svg className="ml-1 size-3 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </DropdownButton>
                <DropdownMenu className="min-w-[5rem]" anchor="bottom start">
                  {[10, 20, 50, 100].map((size) => (
                    <DropdownItem key={size} onClick={() => onPageSizeChange(size)}>
                      {size}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </div>

        <div className="flex items-center gap-8">
          <Pagination>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
            />
            <PaginationList>
              {renderPageNumbers()}
            </PaginationList>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            />
          </Pagination>

          <Text color="secondary" size="sm">
            Showing <span className="font-medium text-primary">{startItem}</span> - <span className="font-medium text-primary">{endItem}</span> of <span className="font-medium text-primary">{totalItems}</span> {itemName}
          </Text>
        </div>
      </div>
    </div>
  )
}
