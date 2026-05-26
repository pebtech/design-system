import { cn } from '../utils/cn'
import React, { forwardRef } from 'react'
import { useFocusRing } from 'react-aria'

export interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  className?: string
}

export const Select = forwardRef(function Select(
  { className, multiple, ...props }: SelectProps,
  forwardedRef: React.ForwardedRef<HTMLSelectElement>
) {
  const localRef = React.useRef<HTMLSelectElement>(null)
  
  const setRef = React.useCallback((node: HTMLSelectElement | null) => {
    (localRef as any).current = node
    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
      } else {
        (forwardedRef as any).current = node
      }
    }
  }, [forwardedRef])

  const { focusProps, isFocusVisible } = useFocusRing()
  const isDisabled = props.disabled || false

  return (
    <span
      data-slot="control"
      className={cn([
        className,
        // Basic layout
        'group relative block w-full',
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-input before:shadow-sm',
        // Focus ring
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset has-data-focus:after:ring-2 has-data-focus:after:ring-focus-primary',
        // Disabled state
        isDisabled && 'opacity-50 before:bg-input/5 before:shadow-none',
      ])}
      data-disabled={isDisabled ? '' : undefined}
      data-focus={isFocusVisible ? '' : undefined}
    >
      <select
        ref={setRef}
        multiple={multiple}
        {...props}
        {...focusProps}
        data-disabled={isDisabled ? '' : undefined}
        data-focus={isFocusVisible ? '' : undefined}
        className={cn([
          // Basic layout
          'relative block w-full appearance-none rounded-lg py-[calc(--spacing(2.5)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
          // Horizontal padding
          multiple
            ? 'px-[calc(--spacing(3.5)-1px)] sm:px-[calc(--spacing(3)-1px)]'
            : 'pr-[calc(--spacing(10)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pr-[calc(--spacing(9)-1px)] sm:pl-[calc(--spacing(3)-1px)]',
          // Options (multi-select)
          '[&_optgroup]:font-semibold',
          // Typography
          'text-base/6 text-primary placeholder:text-muted sm:text-sm/6 dark:text-white dark:*:text-white',
          // Border
          'border border-border hover:border-border-secondary',
          // Background color
          'bg-transparent',
          // Hide default focus styles
          'focus:outline-hidden',
          // Invalid state
          props['aria-invalid'] && 'border-error hover:border-error',
          // Disabled state
          isDisabled && 'border-border opacity-100',
        ])}
      />
      {!multiple && (
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="size-5 stroke-secondary group-data-disabled:stroke-secondary sm:size-4 forced-colors:stroke-[CanvasText]"
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
          >
            <path d="M5.75 10.75L8 13L10.25 10.75" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.25 5.25L8 3L5.75 5.25" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </span>
  )
})
