import React, { createContext, useContext, useRef } from 'react'
import { useRadioGroup, useRadio, useFocusRing, useHover } from 'react-aria'
import { useRadioGroupState } from 'react-stately'
import { cn } from '../utils/cn'
import { FieldProvider, useFieldContext } from '../utils/field-context'

const RadioGroupContext = createContext<any>(null)

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  isDisabled?: boolean
  className?: string
  children: React.ReactNode
}

export function RadioGroup({
  value,
  defaultValue,
  onChange,
  isDisabled,
  className,
  children,
  ...props
}: RadioGroupProps) {
  const state = useRadioGroupState({
    value,
    defaultValue,
    onChange,
    isDisabled,
  })
  
  const { radioGroupProps } = useRadioGroup(
    {
      value,
      defaultValue,
      onChange,
      isDisabled,
      ...props
    },
    state
  )

  return (
    <RadioGroupContext.Provider value={state}>
      <div
        data-slot="control"
        {...radioGroupProps}
        className={cn(
          className,
          'space-y-3 **:data-[slot=label]:font-normal',
          'has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-medium'
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export interface RadioFieldProps extends React.ComponentPropsWithoutRef<'div'> {
  disabled?: boolean
  invalid?: boolean
}

export function RadioField({
  className,
  disabled,
  invalid,
  ...props
}: RadioFieldProps) {
  return (
    <FieldProvider disabled={disabled} invalid={invalid}>
      <div
        data-slot="field"
        {...props}
        className={cn(
          className,
          'grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]',
          '*:data-[slot=control]:col-start-1 *:data-[slot=control]:row-start-1 *:data-[slot=control]:mt-0.75 sm:*:data-[slot=control]:mt-1',
          '*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1',
          '*:data-[slot=description]:col-start-2 *:data-[slot=description]:row-start-2',
          'has-data-[slot=description]:**:data-[slot=label]:font-medium'
        )}
      />
    </FieldProvider>
  )
}

const base = [
  'relative isolate flex size-4.75 shrink-0 rounded-full sm:size-4.25',
  'before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white before:shadow-sm',
  'group-data-checked:before:bg-(--radio-checked-bg)',
  'border border-brand/15 group-data-checked:border-transparent group-data-hover:group-data-checked:border-transparent group-data-hover:border-brand/30 group-data-checked:bg-(--radio-checked-border)',
  'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
  'group-data-checked:[--radio-indicator:var(--radio-checked-indicator)] group-data-hover:group-data-checked:[--radio-indicator:var(--radio-checked-indicator)] group-data-hover:[--radio-indicator:var(--color-brand)]/10',
  'group-data-focus:outline group-data-focus:outline-2 group-data-focus:outline-offset-2 group-data-focus:outline-brand',
  'group-data-disabled:opacity-50',
  'group-data-disabled:border-zinc-950/25 group-data-disabled:bg-zinc-950/5 group-data-disabled:[--radio-checked-indicator:var(--color-zinc-950)]/50 group-data-disabled:before:bg-transparent',
  'dark:group-data-disabled:border-white/20 dark:group-data-disabled:bg-white/2.5 dark:group-data-disabled:[--radio-checked-indicator:var(--color-white)]/50 dark:group-data-checked:group-data-disabled:after:hidden',
]

const colors = {
  'dark/zinc': [
    '[--radio-checked-bg:var(--color-zinc-900)] [--radio-checked-border:var(--color-zinc-950)]/90 [--radio-checked-indicator:var(--color-white)]',
    'dark:[--radio-checked-bg:var(--color-zinc-600)]',
  ],
  'dark/white': [
    '[--radio-checked-bg:var(--color-zinc-900)] [--radio-checked-border:var(--color-zinc-950)]/90 [--radio-checked-indicator:var(--color-white)]',
    'dark:[--radio-checked-bg:var(--color-white)] dark:[--radio-checked-border:var(--color-zinc-950)]/15 dark:[--radio-checked-indicator:var(--color-zinc-900)]',
  ],
  brand: [
    '[--radio-checked-bg:var(--color-brand)] [--radio-checked-border:var(--color-brand)]/90 [--radio-checked-indicator:var(--color-white)]',
  ],
  white:
    '[--radio-checked-bg:var(--color-white)] [--radio-checked-border:var(--color-zinc-950)]/15 [--radio-checked-indicator:var(--color-zinc-900)]',
  dark: '[--radio-checked-bg:var(--color-zinc-900)] [--radio-checked-border:var(--color-zinc-950)]/90 [--radio-checked-indicator:var(--color-white)]',
  zinc: '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-zinc-600)] [--radio-checked-border:var(--color-zinc-700)]/90',
  red: '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-red-600)] [--radio-checked-border:var(--color-red-700)]/90',
  orange:
    '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-orange-500)] [--radio-checked-border:var(--color-orange-600)]/90',
  amber:
    '[--radio-checked-bg:var(--color-amber-400)] [--radio-checked-border:var(--color-amber-500)]/80 [--radio-checked-indicator:var(--color-amber-950)]',
  yellow:
    '[--radio-checked-bg:var(--color-yellow-300)] [--radio-checked-border:var(--color-yellow-400)]/80 [--radio-checked-indicator:var(--color-yellow-950)]',
  lime: '[--radio-checked-bg:var(--color-lime-300)] [--radio-checked-border:var(--color-lime-400)]/80 [--radio-checked-indicator:var(--color-lime-950)]',
  green:
    '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-green-600)] [--radio-checked-border:var(--color-green-700)]/90',
  emerald:
    '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-emerald-600)] [--radio-checked-border:var(--color-emerald-700)]/90',
  teal: '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-teal-600)] [--radio-checked-border:var(--color-teal-700)]/90',
  cyan: '[--radio-checked-bg:var(--color-cyan-300)] [--radio-checked-border:var(--color-cyan-400)]/80 [--radio-checked-indicator:var(--color-cyan-950)]',
  sky: '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-sky-500)] [--radio-checked-border:var(--color-sky-600)]/80',
  blue: '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-blue-600)] [--radio-checked-border:var(--color-blue-700)]/90',
  indigo:
    '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-indigo-500)] [--radio-checked-border:var(--color-indigo-600)]/90',
  violet:
    '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-violet-500)] [--radio-checked-border:var(--color-violet-600)]/90',
  purple:
    '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-purple-500)] [--radio-checked-border:var(--color-purple-600)]/90',
  fuchsia:
    '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-fuchsia-500)] [--radio-checked-border:var(--color-fuchsia-600)]/90',
  pink: '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-pink-500)] [--radio-checked-border:var(--color-pink-600)]/90',
  rose: '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-rose-500)] [--radio-checked-border:var(--color-rose-600)]/90',
}

type Color = keyof typeof colors

export interface RadioProps {
  color?: Color
  value: string
  isDisabled?: boolean
  className?: string
}

export function Radio({
  color = 'dark/zinc',
  className,
  value,
  isDisabled: customDisabled,
  ...props
}: RadioProps) {
  const ref = useRef<HTMLInputElement>(null)
  const groupState = useContext(RadioGroupContext)
  const fieldContext = useFieldContext()

  if (!groupState) {
    throw new Error('Radio must be used within a RadioGroup')
  }

  const isDisabled = customDisabled || groupState.isDisabled || fieldContext?.disabled || false
  const isChecked = groupState.selectedValue === value

  const ariaProps = {
    value,
    isDisabled,
    ...props
  }

  const { inputProps } = useRadio(ariaProps, groupState, ref)
  const { focusProps, isFocusVisible } = useFocusRing()
  const { hoverProps, isHovered } = useHover({ isDisabled })

  return (
    <label
      data-slot="control"
      className={cn(className, 'group inline-flex items-center gap-3 cursor-pointer select-none')}
      data-checked={isChecked ? '' : undefined}
      data-disabled={isDisabled ? '' : undefined}
      data-hover={isHovered ? '' : undefined}
      data-focus={isFocusVisible ? '' : undefined}
      {...hoverProps}
    >
      <input
        {...inputProps}
        {...focusProps}
        ref={ref}
        className="sr-only"
      />
      <span
        className={cn(base, colors[color], 'transition-colors duration-150')}
        data-checked={isChecked ? '' : undefined}
        data-disabled={isDisabled ? '' : undefined}
        data-hover={isHovered ? '' : undefined}
        data-focus={isFocusVisible ? '' : undefined}
      >
        <span
          className={cn(
            'size-full rounded-full border-[4.5px] border-transparent bg-clip-padding',
            'transition-all duration-150 ease-out',
            'forced-colors:border-[Canvas] forced-colors:group-data-checked:border-[Highlight]'
          )}
          style={{
            backgroundColor: isChecked ? 'var(--radio-indicator, #ffffff)' : 'transparent',
            transform: isChecked ? 'scale(1)' : 'scale(0)',
          }}
        />
      </span>
    </label>
  )
}
