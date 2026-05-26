import clsx from 'clsx'
import React, { createContext, useContext, useState } from 'react'
import { Link } from '../typography/link'

const TableContext = createContext<{ bleed: boolean; dense: boolean; grid: boolean; striped: boolean }>({
  bleed: false,
  dense: false,
  grid: false,
  striped: false,
})

export function Table({
  bleed = false,
  dense = false,
  grid = false,
  striped = false,
  className,
  children,
  ...props
}: { bleed?: boolean; dense?: boolean; grid?: boolean; striped?: boolean } & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <TableContext.Provider value={{ bleed, dense, grid, striped } as React.ContextType<typeof TableContext>}>
      <div className="flow-root">
        <div
          {...props}
          className={clsx(
            className,
            '-mx-(--gutter) overflow-x-auto whitespace-nowrap',
            // Scrollbar customization
            '[&::-webkit-scrollbar]:h-1.5',
            '[&::-webkit-scrollbar-track]:bg-transparent',
            '[&::-webkit-scrollbar-thumb]:rounded-full',
            '[&::-webkit-scrollbar-thumb]:bg-zinc-200',
            '[&::-webkit-scrollbar-thumb]:hover:bg-zinc-400'
          )}
        >
          <div className={clsx('inline-block min-w-full align-middle', !bleed && 'sm:px-(--gutter)')}>
            <table className="min-w-full text-left text-sm/6 text-primary bg-tableBg">{children}</table>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  )
}

export function TableHead({ className, ...props }: React.ComponentPropsWithoutRef<'thead'>) {
  return <thead {...props} className={clsx(className, 'text-secondary bg-tableHeader')} />
}

export function TableBody(props: React.ComponentPropsWithoutRef<'tbody'>) {
  return <tbody {...props} />
}

const TableRowContext = createContext<{ href?: string; target?: string; title?: string }>({
  href: undefined,
  target: undefined,
  title: undefined,
})

export const TableRow = React.forwardRef<HTMLTableRowElement, { href?: string; target?: string; title?: string } & React.ComponentPropsWithoutRef<'tr'>>(
  function TableRow({ href, target, title, className, ...props }, ref) {
    const { striped } = useContext(TableContext)

    return (
      <TableRowContext.Provider value={{ href, target, title } as React.ContextType<typeof TableRowContext>}>
        <tr
          ref={ref}
          {...props}
          className={clsx(
            className,
            href &&
            'has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-brand',
            striped && 'even:bg-primary/2.5',
            href && striped && 'hover:bg-hover-primary',
            href && !striped && 'hover:bg-hover-primary'
          )}
        />
      </TableRowContext.Provider>
    )
  }
)

export function TableHeader({ className, ...props }: React.ComponentPropsWithoutRef<'th'>) {
  const { bleed, grid } = useContext(TableContext)

  return (
    <th
      {...props}
      className={clsx(
        className,
        'border-b border-b-border px-4 py-2 font-medium first:pl-4! last:pr-4!',
        grid && 'border-l border-l-border first:border-l-0',
        !bleed && 'sm:first:pl-1 sm:last:pr-1'
      )}
    />
  )
}

export function TableCell({ className, children, ...props }: React.ComponentPropsWithoutRef<'td'>) {
  const { bleed, dense, grid, striped } = useContext(TableContext)
  const { href, target, title } = useContext(TableRowContext)
  const [cellRef, setCellRef] = useState<HTMLElement | null>(null)

  return (
    <td
      ref={href ? setCellRef : undefined}
      {...props}
      className={clsx(
        className,
        'relative px-4 first:pl-4! last:pr-4!',
        !striped && 'border-b border-border',
        grid && 'border-l border-l-border first:border-l-0',
        dense ? 'py-1' : 'py-4',
        !bleed && 'sm:first:pl-1 sm:last:pr-1'
      )}
    >
      {href && (
        <Link
          data-row-link
          href={href}
          target={target}
          aria-label={title}
          tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
          className="absolute inset-0 focus:outline-hidden"
        />
      )}
      {children}
    </td>
  )
}
