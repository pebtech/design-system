import clsx from 'clsx'

export type DescriptionListProps = React.ComponentPropsWithoutRef<'dl'> & {
  /** `card` — bordered surface; `plain` — no outer chrome (dividers only). */
  variant?: 'card' | 'plain'
}

export function DescriptionList({
  className,
  variant = 'card',
  ...props
}: DescriptionListProps) {
  return (
    <dl
      {...props}
      className={clsx(
        className,
        variant === 'card' && 'overflow-hidden rounded-xl border border-border bg-surface',
      )}
    />
  )
}

/**
 * Preferred API — one labelled row (valid HTML5: `div` groups `dt` + `dd` inside `dl`).
 */
export function DescriptionListItem({
  className,
  term,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  term: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'grid grid-cols-1 gap-1 border-b border-border px-4 py-3.5 last:border-b-0',
        'sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-start sm:gap-x-8 sm:py-4',
      )}
    >
      <DescriptionTerm className="pt-0 pb-0 sm:pt-0">{term}</DescriptionTerm>
      <DescriptionDetails className="pt-0 pb-0 sm:pt-0">{children}</DescriptionDetails>
    </div>
  )
}

/** Label — use inside {@link DescriptionListItem} or after {@link DescriptionList} for custom layouts. */
export function DescriptionTerm({ className, ...props }: React.ComponentPropsWithoutRef<'dt'>) {
  return (
    <dt
      {...props}
      className={clsx(className, 'text-sm font-medium text-secondary')}
    />
  )
}

/** Value — use inside {@link DescriptionListItem} or after {@link DescriptionTerm}. */
export function DescriptionDetails({ className, ...props }: React.ComponentPropsWithoutRef<'dd'>) {
  return (
    <dd
      {...props}
      className={clsx(className, 'text-sm text-primary')}
    />
  )
}
