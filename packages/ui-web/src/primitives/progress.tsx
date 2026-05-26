import React from 'react'
import { cn } from '../utils/cn'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  color?: 'indigo' | 'green' | 'red' | 'amber' | 'blue' | 'zinc' | 'cyan' | 'purple' | 'brand'
}

export function Progress({
  className,
  value = 0,
  max = 100,
  color = 'indigo',
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const colorClasses = {
    indigo: 'bg-indigo-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    amber: 'bg-amber-500',
    blue: 'bg-blue-600',
    zinc: 'bg-zinc-600',
    cyan: 'bg-cyan-600',
    purple: 'bg-purple-600',
    brand: 'bg-brandBg',
  }

  return (
    <div
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-quaternaryBg', className)}
      {...props}
    >
      <div
        className={cn('h-full w-full flex-1 transition-all', colorClasses[color])}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  )
}
