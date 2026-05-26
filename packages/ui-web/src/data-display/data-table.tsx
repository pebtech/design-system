import type React from 'react'

import { EmptyState } from './empty-state'
import { TablePagination } from '../navigation/pagination'
import { Skeleton } from '../primitives/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../primitives/table'

export type DataTableColumn<T> = {
  key: keyof T | string
  header: string
  cell?: (row: T) => React.ReactNode
  className?: string
}

export type DataTableProps<T> = {
  title?: string
  columns: DataTableColumn<T>[]
  data: T[]
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  rowKey?: (row: T, index: number) => string
  rowActions?: (row: T) => React.ReactNode
  page?: number
  totalPages?: number
  totalItems?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export function DataTable<T>({
  title,
  columns,
  data,
  isLoading = false,
  isError = false,
  errorMessage = 'Something went wrong while loading data.',
  rowKey,
  rowActions,
  page = 1,
  totalPages = 1,
  totalItems,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<T>) {
  const resolvedTotalItems = totalItems ?? data.length
  const columnCount = columns.length + (rowActions ? 1 : 0)
  const showPagination = Boolean(onPageChange && resolvedTotalItems > pageSize)

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-tableBg">
      {title ? <div className="border-b border-border px-4 py-3 text-sm font-semibold text-primary">{title}</div> : null}

      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeader key={String(column.key)} className={column.className}>
                {column.header}
              </TableHeader>
            ))}
            {rowActions ? <TableHeader>Actions</TableHeader> : null}
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  {columns.map((column) => (
                    <TableCell key={`${String(column.key)}-${index}`}>
                      <Skeleton className="h-4 w-full max-w-[180px]" />
                    </TableCell>
                  ))}
                  {rowActions ? (
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                  ) : null}
                </TableRow>
              ))
            : null}

          {!isLoading && isError ? (
            <TableRow>
              <TableCell colSpan={columnCount}>
                <div className="py-6 text-sm text-error">{errorMessage}</div>
              </TableCell>
            </TableRow>
          ) : null}

          {!isLoading && !isError && data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columnCount}>
                <div className="py-4">
                  <EmptyState title="No records found" description="Adjust your filters or create a new record." />
                </div>
              </TableCell>
            </TableRow>
          ) : null}

          {!isLoading && !isError
            ? data.map((row, index) => (
                <TableRow key={rowKey ? rowKey(row, index) : `row-${index}`}>
                  {columns.map((column) => (
                    <TableCell key={`${String(column.key)}-${index}`} className={column.className}>
                      {column.cell ? column.cell(row) : String(row[column.key as keyof T] ?? '')}
                    </TableCell>
                  ))}
                  {rowActions ? <TableCell>{rowActions(row)}</TableCell> : null}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>

      {showPagination ? (
        <TablePagination
          page={page}
          totalPages={totalPages}
          totalItems={resolvedTotalItems}
          pageSize={pageSize}
          onPageChange={onPageChange!}
          onPageSizeChange={onPageSizeChange}
          itemName="records"
        />
      ) : null}
    </div>
  )
}
