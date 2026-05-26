import React, { useRef } from 'react'
import { useToggleButton } from 'react-aria'
import { useToggleState } from 'react-stately'
import { cn } from '../utils/cn'

export interface ToggleProps {
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  className?: string
  children: React.ReactNode
}

export function Toggle({
  isSelected,
  defaultSelected,
  onChange,
  isDisabled,
  className,
  children,
  ...props
}: ToggleProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const state = useToggleState({
    isSelected,
    defaultSelected,
    onChange,
  })
  
  const { buttonProps } = useToggleButton(
    {
      ...props,
      isDisabled,
    },
    state,
    ref
  )

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50 h-9 px-3 border border-zinc-200 bg-transparent text-zinc-900 hover:bg-zinc-100 hover:text-zinc-900',
        'dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
        state.isSelected && 'bg-zinc-900 text-white hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90',
        className
      )}
    >
      {children}
    </button>
  )
}
