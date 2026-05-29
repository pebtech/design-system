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
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50 h-9 px-3',
        state.isSelected
          ? 'border-transparent bg-brandBg text-white hover:bg-brandBg/80'
          : 'border border-border bg-transparent text-primary hover:bg-secondary/80',
        className
      )}
    >
      {children}
    </button>
  )
}
