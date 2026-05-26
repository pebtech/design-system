import * as React from 'react'
import { cn } from '../utils/cn'

interface SliderProps {
  value: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
  disabled?: boolean
  className?: string
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled = false,
  className,
  ...props
}: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.([parseFloat(e.target.value)])
  }

  const val = value[0] ?? min
  const percentage = ((val - min) / (max - min)) * 100

  return (
    <div
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        disabled={disabled}
        onChange={handleChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10"
      />
      <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-quaternaryBg">
        <div
          className="absolute h-full bg-brandBg transition-[width] duration-150 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className="absolute h-5 w-5 rounded-full border-2 border-brand bg-surface shadow-md transition-all duration-150 ease-out dark:bg-canvas"
        style={{ left: `calc(${percentage}% - 10px)` }}
      />
    </div>
  )
}
