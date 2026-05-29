import clsx from 'clsx'
import React, { createContext, useContext } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { Button } from '../primitives/button'
import { Text } from '../typography/text'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '../primitives/dropdown'

export type PaginationAppearance = 'ghost' | 'outline' | 'solid' | 'minimal' | 'compact'

type PaginationContextValue = {
  appearance: PaginationAppearance
}

const PaginationContext = createContext<PaginationContextValue>({ appearance: 'ghost' })

function usePaginationAppearance() {
  return useContext(PaginationContext).appearance
}

const navStyles: Record<PaginationAppearance, string> = {
  ghost: 'flex gap-x-2',
  outline: 'flex gap-x-1.5',
  solid: 'flex gap-x-0.5 rounded-lg bg-secondary/40 p-1 ring-1 ring-border/60',
  minimal: 'flex items-center gap-x-0.5',
  compact: 'flex gap-x-0.5',
}

const listStyles: Record<PaginationAppearance, string> = {
  ghost: 'hidden items-baseline gap-x-2 sm:flex',
  outline: 'hidden items-baseline gap-x-1.5 sm:flex',
  solid: 'hidden items-center gap-x-0.5 sm:flex',
  minimal: 'flex items-center gap-x-0.5',
  compact: 'flex items-center gap-x-0.5',
}

const controlVariants: Record<
  PaginationAppearance,
  { variant: 'ghost' | 'outline'; size: 'xs' | 'sm' }
> = {
  ghost: { variant: 'ghost', size: 'sm' },
  outline: { variant: 'outline', size: 'sm' },
  solid: { variant: 'ghost', size: 'sm' },
  minimal: { variant: 'ghost', size: 'sm' },
  compact: { variant: 'ghost', size: 'xs' },
}

const pageCurrentStyles: Record<PaginationAppearance, string> = {
  ghost: 'before:bg-primary/10 font-bold',
  outline: 'border-brand! bg-brand/5 font-semibold text-brand shadow-none',
  solid: 'bg-surface font-semibold text-primary shadow-sm ring-1 ring-border',
  minimal: 'font-semibold text-brand data-hover:bg-transparent',
  compact: 'min-w-8 before:bg-primary/10 font-bold',
}

const pageBaseStyles: Record<PaginationAppearance, string> = {
  ghost: 'min-w-9 before:absolute before:-inset-px before:rounded-lg',
  outline: 'min-w-9',
  solid: 'min-w-9 rounded-md',
  minimal: 'min-w-0 border-0 px-2 py-1 text-sm font-normal shadow-none before:hidden after:hidden',
  compact: 'min-w-8 before:absolute before:-inset-px before:rounded-md',
}

const gapStyles: Record<PaginationAppearance, string> = {
  ghost: 'w-9 text-center text-sm/6 font-semibold text-primary select-none',
  outline: 'w-9 text-center text-sm/6 font-semibold text-tertiary select-none',
  solid: 'w-8 text-center text-sm/6 font-medium text-tertiary select-none',
  minimal: 'px-1 text-sm text-tertiary select-none',
  compact: 'w-7 text-center text-xs font-semibold text-tertiary select-none',
}

export type PaginationRangeItem = number | 'gap-start' | 'gap-end'

/** Page numbers and ellipsis slots for building a page list. */
export function getPaginationRange(
  page: number,
  totalPages: number,
  maxVisible = 5,
): PaginationRangeItem[] {
  if (totalPages <= 0) return []
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const items: PaginationRangeItem[] = [1]

  if (page > 3) {
    items.push('gap-start')
  }

  const start = Math.max(2, page - 1)
  const end = Math.min(totalPages - 1, page + 1)

  for (let i = start; i <= end; i++) {
    items.push(i)
  }

  if (page < totalPages - 2) {
    items.push('gap-end')
  }

  items.push(totalPages)
  return items
}

export function Pagination({
  'aria-label': ariaLabel = 'Page navigation',
  appearance = 'ghost',
  className,
  ...props
}: ComponentPropsWithoutRef<'nav'> & { appearance?: PaginationAppearance }) {
  return (
    <PaginationContext.Provider value={{ appearance }}>
      <nav aria-label={ariaLabel} {...props} className={clsx(navStyles[appearance], className)} />
    </PaginationContext.Provider>
  )
}

interface PaginationButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'color'> {
  href?: string
  disabled?: boolean
  /** Hide label text; keep icons (compact toolbars). */
  iconOnly?: boolean
}

export function PaginationPrevious({
  href = undefined,
  className,
  children = 'Previous',
  disabled,
  iconOnly = false,
  ...props
}: PaginationButtonProps) {
  const appearance = usePaginationAppearance()
  const isLink = href && !disabled
  const { variant, size } = controlVariants[appearance]
  const showLabel = !iconOnly && appearance !== 'compact'

  return (
    <span className={clsx(className, appearance === 'minimal' ? '' : 'grow basis-0')}>
      <Button
        {...(props as React.ComponentProps<typeof Button>)}
        {...(isLink ? { href } : { disabled })}
        variants={{ variant, size }}
        aria-label="Previous page"
        className={clsx(
          appearance === 'minimal' && 'px-2 text-secondary data-hover:text-primary',
          iconOnly && 'px-2!',
        )}
      >
        <svg className="stroke-current" data-slot="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {showLabel ? children : <span className="sr-only">{children}</span>}
      </Button>
    </span>
  )
}

export function PaginationNext({
  href = undefined,
  className,
  children = 'Next',
  disabled,
  iconOnly = false,
  ...props
}: PaginationButtonProps) {
  const appearance = usePaginationAppearance()
  const isLink = href && !disabled
  const { variant, size } = controlVariants[appearance]
  const showLabel = !iconOnly && appearance !== 'compact'

  return (
    <span
      className={clsx(
        className,
        appearance === 'minimal' ? '' : 'flex grow basis-0 justify-end',
      )}
    >
      <Button
        {...(props as React.ComponentProps<typeof Button>)}
        {...(isLink ? { href } : { disabled })}
        variants={{ variant, size }}
        aria-label="Next page"
        className={clsx(
          appearance === 'minimal' && 'px-2 text-secondary data-hover:text-primary',
          iconOnly && 'px-2!',
        )}
      >
        {showLabel ? children : <span className="sr-only">{children}</span>}
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

export function PaginationList({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  const appearance = usePaginationAppearance()
  return <span {...props} className={clsx(listStyles[appearance], className)} />
}

export function PaginationPage({
  href = undefined,
  className,
  current = false,
  children,
  disabled,
  ...props
}: PaginationButtonProps & { current?: boolean }) {
  const appearance = usePaginationAppearance()
  const isLink = href && !disabled
  const { variant, size } = controlVariants[appearance]
  const pageVariant = appearance === 'outline' && !current ? 'outline' : variant

  return (
    <Button
      {...(props as React.ComponentProps<typeof Button>)}
      {...(isLink ? { href } : { disabled })}
      variants={{ variant: pageVariant, size }}
      aria-label={`Page ${children}`}
      aria-current={current ? 'page' : undefined}
      className={clsx(pageBaseStyles[appearance], className, current && pageCurrentStyles[appearance])}
    >
      <span className={appearance === 'minimal' ? '' : '-mx-0.5'}>{children}</span>
    </Button>
  )
}

export function PaginationGap({
  className,
  children = <>&hellip;</>,
  ...props
}: ComponentPropsWithoutRef<'span'>) {
  const appearance = usePaginationAppearance()
  return (
    <span aria-hidden="true" {...props} className={clsx(gapStyles[appearance], className)}>
      {children}
    </span>
  )
}

/** Centered “Page X of Y” with optional numbered list — good for modals and narrow layouts. */
export function PaginationSimple({
  page,
  totalPages,
  onPageChange,
  appearance = 'ghost',
  showPageNumbers = false,
  className,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  appearance?: PaginationAppearance
  showPageNumbers?: boolean
  className?: string
}) {
  const range = getPaginationRange(page, totalPages)

  return (
    <Pagination appearance={appearance} className={clsx('items-center', className)}>
      <PaginationPrevious
        iconOnly={appearance === 'compact'}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
      />
      {showPageNumbers ? (
        <PaginationList>
          {range.map((item) =>
            typeof item === 'number' ? (
              <PaginationPage
                key={item}
                onClick={() => onPageChange(item)}
                current={page === item}
              >
                {item}
              </PaginationPage>
            ) : (
              <PaginationGap key={item} />
            ),
          )}
        </PaginationList>
      ) : (
        <Text size="sm" color="secondary" className="shrink-0 px-2 tabular-nums">
          Page <span className="font-medium text-primary">{page}</span> of{' '}
          <span className="font-medium text-primary">{totalPages}</span>
        </Text>
      )}
      <PaginationNext
        iconOnly={appearance === 'compact'}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
      />
    </Pagination>
  )
}

export function PaginationPages({
  page,
  totalPages,
  onPageChange,
  maxVisible = 5,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisible?: number
}) {
  const range = getPaginationRange(page, totalPages, maxVisible)

  return (
    <>
      {range.map((item) =>
        typeof item === 'number' ? (
          <PaginationPage key={item} onClick={() => onPageChange(item)} current={page === item}>
            {item}
          </PaginationPage>
        ) : (
          <PaginationGap key={item} />
        ),
      )}
    </>
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
  appearance?: PaginationAppearance
}

export function TablePagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  onPageSizeChange,
  itemName = 'results',
  appearance = 'ghost',
}: TablePaginationProps) {
  const startItem = Math.min((page - 1) * pageSize + 1, totalItems)
  const endItem = Math.min(page * pageSize, totalItems)

  return (
    <div className="flex items-center justify-between border-t border-border bg-tableBg px-4 py-3 sm:px-6">
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

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {onPageSizeChange ? (
            <div className="flex items-center gap-2">
              <Text color="secondary" size="sm">
                Rows per Page
              </Text>
              <Dropdown>
                <DropdownButton as={Button} preset="outline" className="px-2! py-1! text-xs font-normal">
                  {pageSize}
                  <svg
                    className="ml-1 size-3 text-muted"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </DropdownButton>
                <DropdownMenu className="min-w-20" anchor="bottom start">
                  {[10, 20, 50, 100].map((size) => (
                    <DropdownItem key={size} onClick={() => onPageSizeChange(size)}>
                      {size}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-8">
          <Pagination appearance={appearance}>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
            />
            <PaginationList>
              <PaginationPages page={page} totalPages={totalPages} onPageChange={onPageChange} />
            </PaginationList>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            />
          </Pagination>

          <Text color="secondary" size="sm">
            Showing <span className="font-medium text-primary">{startItem}</span> -{' '}
            <span className="font-medium text-primary">{endItem}</span> of{' '}
            <span className="font-medium text-primary">{totalItems}</span> {itemName}
          </Text>
        </div>
      </div>
    </div>
  )
}
