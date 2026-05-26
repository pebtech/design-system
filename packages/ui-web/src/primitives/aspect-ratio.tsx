import React from 'react'
import { cn } from '../utils/cn'

export interface AspectRatioProps extends React.ComponentPropsWithoutRef<'div'> {
  ratio?: number
}

export function AspectRatio({ ratio = 1, className, style, ...props }: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      {...props}
      className={cn('relative w-full overflow-hidden', className)}
      style={{
        ...style,
        aspectRatio: String(ratio),
      }}
    />
  )
}
