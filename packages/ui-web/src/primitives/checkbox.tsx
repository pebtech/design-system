import React, { useRef, createContext, useContext } from 'react'
import { useCheckbox, useCheckboxGroup, useFocusRing, useHover } from 'react-aria'
import { useToggleState, useCheckboxGroupState } from 'react-stately'
import { cn } from '../utils/cn'
import { FieldProvider, useFieldContext } from '../utils/field-context'

const CheckboxGroupContext = createContext<any>(null)

export interface CheckboxGroupProps {
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  isDisabled?: boolean
  className?: string
  children: React.ReactNode
}

export function CheckboxGroup({
  className,
  children,
  isDisabled,
  ...props
}: CheckboxGroupProps) {
  const state = useCheckboxGroupState({ ...props, isDisabled })
  const { groupProps } = useCheckboxGroup({ ...props, isDisabled }, state)

  return (
    <div {...groupProps} className={cn('space-y-3', className)}>
      <CheckboxGroupContext.Provider value={state}>
        {children}
      </CheckboxGroupContext.Provider>
    </div>
  )
}

export interface CheckboxFieldProps extends React.ComponentPropsWithoutRef<'div'> {
  disabled?: boolean
  invalid?: boolean
}

export function CheckboxField({
  className,
  disabled,
  invalid,
  ...props
}: CheckboxFieldProps) {
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
  'relative isolate flex size-4.5 items-center justify-center rounded-[0.3125rem] sm:size-4',
  'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-surface before:shadow-sm',
  'group-data-checked:before:bg-(--checkbox-checked-bg)',
  'border border-zinc-950/15 group-data-checked:border-transparent group-data-hover:group-data-checked:border-transparent group-data-hover:border-zinc-950/30 group-data-checked:bg-(--checkbox-checked-border)',
  'after:absolute after:inset-0 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]',
  'group-data-focus:outline-2 group-data-focus:outline-offset-2 group-data-focus:outline-indigo-500',
  'group-data-disabled:opacity-50',
  'group-data-disabled:border-zinc-950/25 group-data-disabled:bg-zinc-950/5 group-data-disabled:[--checkbox-check:var(--color-zinc-950)]/50 group-data-disabled:before:bg-transparent',
  'forced-colors:[--checkbox-check:HighlightText] forced-colors:[--checkbox-checked-bg:Highlight] forced-colors:group-data-disabled:[--checkbox-check:Highlight]',
]

const colors = {
  'dark/zinc': [
    '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-zinc-900)] [--checkbox-checked-border:var(--color-zinc-950)]/90',
  ],
  'dark/white': [
    '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-zinc-900)] [--checkbox-checked-border:var(--color-zinc-950)]/90',
  ],
  brand: [
    '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-brand)] [--checkbox-checked-border:var(--color-brand)]/90',
  ],
  white:
    '[--checkbox-check:var(--color-zinc-900)] [--checkbox-checked-bg:var(--color-white)] [--checkbox-checked-border:var(--color-zinc-950)]/15',
  dark: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-zinc-900)] [--checkbox-checked-border:var(--color-zinc-950)]/90',
  zinc: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-zinc-600)] [--checkbox-checked-border:var(--color-zinc-700)]/90',
  red: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-red-600)] [--checkbox-checked-border:var(--color-red-700)]/90',
  orange: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-orange-500)] [--checkbox-checked-border:var(--color-orange-600)]/90',
  amber: '[--checkbox-check:var(--color-amber-950)] [--checkbox-checked-bg:var(--color-amber-400)] [--checkbox-checked-border:var(--color-amber-500)]/80',
  yellow: '[--checkbox-check:var(--color-yellow-950)] [--checkbox-checked-bg:var(--color-yellow-300)] [--checkbox-checked-border:var(--color-yellow-400)]/80',
  lime: '[--checkbox-check:var(--color-lime-950)] [--checkbox-checked-bg:var(--color-lime-300)] [--checkbox-checked-border:var(--color-lime-400)]/80',
  green: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-green-600)] [--checkbox-checked-border:var(--color-green-700)]/90',
  emerald: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-emerald-600)] [--checkbox-checked-border:var(--color-emerald-700)]/90',
  teal: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-teal-600)] [--checkbox-checked-border:var(--color-teal-700)]/90',
  cyan: '[--checkbox-check:var(--color-cyan-950)] [--checkbox-checked-bg:var(--color-cyan-300)] [--checkbox-checked-border:var(--color-cyan-400)]/80',
  sky: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-sky-500)] [--checkbox-checked-border:var(--color-sky-600)]/80',
  blue: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-blue-600)] [--checkbox-checked-border:var(--color-blue-700)]/90',
  indigo: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-indigo-500)] [--checkbox-checked-border:var(--color-indigo-600)]/90',
  violet: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-violet-500)] [--checkbox-checked-border:var(--color-violet-600)]/90',
  purple: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-purple-500)] [--checkbox-checked-border:var(--color-purple-600)]/90',
  fuchsia: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-fuchsia-500)] [--checkbox-checked-border:var(--color-fuchsia-600)]/90',
  pink: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-pink-500)] [--checkbox-checked-border:var(--color-pink-600)]/90',
  rose: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-rose-500)] [--checkbox-checked-border:var(--color-rose-600)]/90',
}

type Color = keyof typeof colors

export interface CheckboxProps {
  color?: Color
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  isIndeterminate?: boolean
  className?: string
  value?: string
  children?: React.ReactNode
}

export function Checkbox({
  color = 'brand',
  className,
  isSelected,
  defaultSelected,
  onChange,
  isDisabled: customDisabled,
  isIndeterminate,
  value,
  children,
  ...props
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)
  
  // Access contexts
  const groupState = useContext(CheckboxGroupContext)
  const fieldContext = useFieldContext()

  const isDisabled = customDisabled || groupState?.isDisabled || fieldContext?.disabled || false

  const stateProps = {
    isSelected,
    defaultSelected,
    onChange,
    value,
  }

  // If inside group state
  const isSelectedVal = groupState 
    ? groupState.value.includes(value || '')
    : isSelected

  const onChangeVal = (checked: boolean) => {
    if (groupState && value) {
      if (checked) {
        groupState.addValue(value)
      } else {
        groupState.removeValue(value)
      }
    } else {
      onChange?.(checked)
    }
  }

  const statelyState = useToggleState({
    ...stateProps,
    isSelected: isSelectedVal,
    onChange: onChangeVal,
  })

  const ariaProps = {
    ...props,
    isSelected: isSelectedVal,
    onChange: onChangeVal,
    isDisabled,
    isIndeterminate,
    value,
  }

  const { inputProps } = useCheckbox(ariaProps, statelyState, ref)
  const { focusProps, isFocusVisible } = useFocusRing()
  const { hoverProps, isHovered } = useHover({ isDisabled })

  const isChecked = statelyState.isSelected

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
        <svg
          className="size-4 stroke-(--checkbox-check) opacity-0 group-data-checked:opacity-100 sm:h-3.5 sm:w-3.5 scale-75 group-data-checked:scale-100 transition-all duration-150 ease-out"
          data-checked={isChecked ? '' : undefined}
          viewBox="0 0 14 14"
          fill="none"
          style={{ opacity: isChecked || isIndeterminate ? 1 : 0 }}
        >
          {isIndeterminate ? (
            <path
              d="M3 7H11"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </span>
      {children}
    </label>
  )
}
