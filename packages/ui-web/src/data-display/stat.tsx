import { Badge } from '../primitives/badge'
import { Card } from '../layout/card'
function MoveUpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

function MoveDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  )
}

export function Stat({ title, value, change, except, badgeColor = 'zinc', className }: {
  title: string;
  value: string;
  change: string;
  except: string;
  className?: string;
  badgeColor?: 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'zinc'
}) {
  return (
    <div>
      <Card variant="minimal" className={className}>
        <div className="text-lg/6 font-medium sm:text-sm/6">{title}</div>
        <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
        <div className="mt-3 text-sm/6 sm:text-xs/6">
          <Badge color={badgeColor}>{change}</Badge>{' '}
          {except && <span className="text-zinc-500">{except}</span>}
        </div>
      </Card>
    </div>
  )
}

export function Stat2({ title, value, className }: {
  title: string;
  value: string;
  className?: string;
}) {
  return (
    <div>
      <Card variant="minimal" className={className}>
        <div className="text-lg/6 font-medium sm:text-sm/6">{title}</div>
        <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      </Card>
    </div>
  )
}

export function Stat3({ title, value, change, except, badgeColor = 'zinc', className }: {
  title: string;
  value: string;
  change: string;
  except: string;
  className?: string;
  badgeColor?: 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'zinc'
}) {
  return (
    <div>
      <Card variant="minimal" className={className}>
        <div className="text-sm text-zinc-800 dark:text-zinc-400">{title}</div>
        <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
        <div className="mt-3 text-sm/6 sm:text-xs/6">
          <Badge color={badgeColor}>{change}</Badge>{' '}
          {except && <span className="text-zinc-500">{except}</span>}
        </div>
      </Card>
    </div>
  )
}

export type ChangeDirection = 'up' | 'down'

export interface Stat4Props {
  title: string
  value: number | string
  changeLabel?: string
  changePct?: number | string
  changeDirection?: ChangeDirection
  changeColorClass?: string
  className?: string
}

function DirectionIcon({ direction }: { direction?: ChangeDirection }) {
  return direction === 'down' ? (
    <MoveDownIcon className="shrink-0 size-2.5" />
  ) : (
    <MoveUpIcon className="shrink-0 size-2.5" />
  )
}

function formatChangePct(changePct: Stat4Props['changePct']): string {
  return typeof changePct === 'number' ? `${changePct}%` : (changePct ?? '')
}

function ChangeBadge({
  changePct,
  changeDirection,
  changeColorClass,
}: Pick<Stat4Props, 'changePct' | 'changeDirection' | 'changeColorClass'>) {
  if (changePct == null) return null
  const isDown = changeDirection === 'down'
  const pct = formatChangePct(changePct)

  return (
    <Badge color={isDown ? 'red' : 'green'} className={changeColorClass}>
      <DirectionIcon direction={changeDirection} />
      {pct}
    </Badge>
  )
}

export function Stat4({
  title,
  value,
  changeLabel,
  changePct,
  changeDirection,
  changeColorClass,
  className,
}: Stat4Props) {
  return (
    <Card variant="minimal" className={className}>
      <p className="text-sm font-semibold text-zinc-800 dark:text-neutral-200">{title}</p>
      <div className="mt-3 mb-2 flex flex-wrap items-center gap-2">
        <span className="block text-2xl font-medium text-zinc-800 dark:text-neutral-200">{value}</span>
        <div className="mb-2 sm:mb-0">
          <ChangeBadge changePct={changePct} changeDirection={changeDirection} changeColorClass={changeColorClass} />
        </div>
      </div>
      {changeLabel && (
        <p className="text-sm text-zinc-500 dark:text-neutral-400">{changeLabel}</p>
      )}
    </Card>
  )
}

// Alias export to match usage in pages (e.g., Orders, Customers, Payments)
