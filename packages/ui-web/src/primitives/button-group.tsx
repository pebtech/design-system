import React, { createContext, forwardRef, useContext } from 'react'
import { cn } from '../utils/cn'

type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ButtonGroupPosition = 'first' | 'middle' | 'last' | 'only'

type ButtonGroupProps = React.ComponentPropsWithoutRef<'div'> & {
  size?: SizeVariant
}

const ButtonGroupContext = createContext<{
  position: ButtonGroupPosition
  size: SizeVariant
} | null>(null)

export function useButtonGroup() {
  return useContext(ButtonGroupContext)
}

const radiusMap: Record<SizeVariant, { start: string; end: string }> = {
  xs: { start: '!rounded-s-md before:!rounded-s-[calc(var(--radius-md)-1px)] after:!rounded-s-[calc(var(--radius-md)-1px)]', end: '!rounded-e-md before:!rounded-e-[calc(var(--radius-md)-1px)] after:!rounded-e-[calc(var(--radius-md)-1px)]' },
  sm: { start: '!rounded-s-md before:!rounded-s-[calc(var(--radius-md)-1px)] after:!rounded-s-[calc(var(--radius-md)-1px)]', end: '!rounded-e-md before:!rounded-e-[calc(var(--radius-md)-1px)] after:!rounded-e-[calc(var(--radius-md)-1px)]' },
  md: { start: '!rounded-s-lg before:!rounded-s-[calc(var(--radius-lg)-1px)] after:!rounded-s-[calc(var(--radius-lg)-1px)]', end: '!rounded-e-lg before:!rounded-e-[calc(var(--radius-lg)-1px)] after:!rounded-e-[calc(var(--radius-lg)-1px)]' },
  lg: { start: '!rounded-s-lg before:!rounded-s-[calc(var(--radius-lg)-1px)] after:!rounded-s-[calc(var(--radius-lg)-1px)]', end: '!rounded-e-lg before:!rounded-e-[calc(var(--radius-lg)-1px)] after:!rounded-e-[calc(var(--radius-lg)-1px)]' },
  xl: { start: '!rounded-s-xl before:!rounded-s-[calc(var(--radius-xl)-1px)] after:!rounded-s-[calc(var(--radius-xl)-1px)]', end: '!rounded-e-xl before:!rounded-e-[calc(var(--radius-xl)-1px)] after:!rounded-e-[calc(var(--radius-xl)-1px)]' },
}

export function getButtonGroupClasses(position: ButtonGroupPosition, size: SizeVariant): string {
  const radius = radiusMap[size]
  const base = '!rounded-none before:!rounded-none after:!rounded-none focus:z-10'

  if (position === 'only') return ''
  if (position === 'first') return cn(base, radius.start)
  if (position === 'last') return cn(base, radius.end)
  return base
}

export const ButtonGroup = forwardRef(function ButtonGroup(
  { className, size = 'md', children, ...props }: ButtonGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const childArray = React.Children.toArray(children)
  const count = childArray.length

  return (
    <div
      {...props}
      className={cn(
        'inline-flex isolate -space-x-px whitespace-nowrap',
        className
      )}
      ref={ref}
    >
      {childArray.map((child, index) => {
        const position: ButtonGroupPosition =
          count === 1 ? 'only' :
          index === 0 ? 'first' :
          index === count - 1 ? 'last' :
          'middle'

        return (
          <ButtonGroupContext.Provider key={index} value={{ position, size }}>
            {child}
          </ButtonGroupContext.Provider>
        )
      })}
    </div>
  )
})
