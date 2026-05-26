import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

export function Listbox<T, M extends boolean = false>({
  className,
  selectedOptionClassName,
  placeholder,
  autoFocus,
  'aria-label': ariaLabel,
  children: options,
  multiple = false as M,
  ...props
}: {
  className?: string
  selectedOptionClassName?: string
  placeholder?: React.ReactNode
  autoFocus?: boolean
  'aria-label'?: string
  children?: React.ReactNode
  multiple?: M
} & Omit<Headless.ListboxProps<typeof Fragment, T, M>, 'as' | 'multiple'>) {
  return (
    <Headless.Listbox {...props} multiple={multiple}>
      <Headless.ListboxButton
        autoFocus={autoFocus}
        data-slot="control"
        aria-label={ariaLabel}
        className={clsx([
          className,
          // Basic layout
          'group relative block w-full',
          // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
          'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-input before:shadow-sm',
          // Hide default focus styles
          'focus:outline-hidden',
          // Focus ring
          'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset data-focus:after:ring-2 data-focus:after:ring-focus-primary',
          // Disabled state
          'data-disabled:opacity-50 data-disabled:before:bg-border data-disabled:before:shadow-none',
        ])}
      >
        <Headless.ListboxSelectedOption
          as="span"
          options={options}
          placeholder={placeholder && <span className="block truncate text-zinc-500">{placeholder}</span>}
          className={clsx([
            // Basic layout
            'relative block w-full truncate appearance-none rounded-lg py-[calc(--spacing(2.5)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
            // Set minimum height for when no value is selected
            'min-h-11 sm:min-h-9',
            // Horizontal padding
            'pr-[calc(--spacing(7)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pl-[calc(--spacing(3)-1px)]',
            // Typography
            'text-left text-base/6 text-primary placeholder:text-primary/50 sm:text-sm/6 forced-colors:text-[CanvasText]',
            // Border
            'border border-border/50 group-data-active:border-border/50 group-data-hover:border-border',
            // Background color
            'bg-transparent ',
            // Invalid state
            'group-data-invalid:border-red-500 group-data-hover:group-data-invalid:border-red-500 dark:group-data-invalid:border-red-600 dark:data-hover:group-data-invalid:border-red-600',
            // Disabled state
            'group-data-disabled:border-zinc-950/20 group-data-disabled:opacity-100 dark:group-data-disabled:border-white/15 dark:group-data-disabled:bg-white/2.5 dark:group-data-disabled:data-hover:border-white/15',
            selectedOptionClassName,
          ])}
        />
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="size-5 stroke-zinc-500 group-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]"
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
          >
            <path d="M5.75 10.75L8 13L10.25 10.75" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.25 5.25L8 3L5.75 5.25" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Headless.ListboxButton>
      <Headless.ListboxOptions
        transition
        anchor="selection start"
        className={clsx(
          // Anchor positioning
          '[--anchor-offset:-1.625rem] [--anchor-padding:--spacing(4)] sm:[--anchor-offset:-1.375rem]',
          // Base styles
          'isolate w-max min-w-[calc(var(--button-width)+1.75rem)] scroll-py-1 rounded-xl p-1 select-none',
          // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
          'outline outline-transparent focus:outline-hidden',
          // Handle scrolling when menu won't fit in viewport
          'overflow-y-scroll overscroll-contain',
          // Popover background
          'bg-surface/70 backdrop-blur-xl',
          // Shadows
          'shadow-lg ring-1 ring-border/50',
          // Transitions
          'transition-opacity duration-100 ease-in data-closed:data-leave:opacity-0 data-transition:pointer-events-none'
        )}
      >
        {options}
      </Headless.ListboxOptions>
    </Headless.Listbox>
  )
}

export function ListboxOption<T>({
  children,
  className,
  selectedChildren,
  showCheckIcon = true,
  ...props
}: { className?: string; children?: React.ReactNode; selectedChildren?: React.ReactNode; showCheckIcon?: boolean } & Omit<
  Headless.ListboxOptionProps<'div', T>,
  'as' | 'className'
>) {
  const sharedClasses = clsx(
    // Base
    'flex min-w-0 items-center',
    // Icons
    '*:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 sm:*:data-[slot=icon]:size-4',
    '*:data-[slot=icon]:text-muted group-data-focus/option:*:data-[slot=icon]:text-brand',
    'forced-colors:*:data-[slot=icon]:text-[CanvasText] forced-colors:group-data-focus/option:*:data-[slot=icon]:text-[Canvas]',
    // Avatars
    '*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:size-5'
  )

  return (
    <Headless.ListboxOption as={Fragment} {...props}>
      {({ selectedOption }) => {
        if (selectedOption) {
          return <span className={clsx(className, sharedClasses, 'after:content-[",_"] last:after:content-none')}>{selectedChildren ?? children}</span>
        }

        return (
          <div
            className={clsx(
              // Basic layout
              'group/option cursor-pointer rounded-lg py-2.5 pr-3.5 sm:py-1.5 sm:pr-3',
              showCheckIcon
                ? 'grid grid-cols-[--spacing(5)_1fr] items-baseline gap-x-2 pl-2 sm:grid-cols-[--spacing(4)_1fr] sm:pl-1.5'
                : 'flex items-center pl-3.5 sm:pl-3',
              // Typography
              'text-base/6 text-primary sm:text-sm/6 forced-colors:text-[CanvasText]',
              // Focus
              'outline-hidden data-focus:bg-hover-primary data-focus:text-primary',
              // Forced colors mode
              'forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText]',
              // Disabled
              'data-disabled:opacity-50'
            )}
          >
            {showCheckIcon && (
              <svg
                className="relative hidden size-5 self-center stroke-current group-data-selected/option:inline sm:size-4"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 8.5l3 3L12 4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span className={clsx(className, sharedClasses, showCheckIcon && 'col-start-2')}>{children}</span>
          </div>
        )
      }}
    </Headless.ListboxOption>
  )
}

export function ListboxLabel({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx(className, 'ml-2.5 truncate first:ml-0 sm:ml-2 sm:first:ml-0')} />
}

export function ListboxDescription({ className, children, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'flex flex-1 overflow-hidden text-muted before:w-2 before:min-w-0 before:shrink'
      )}
    >
      <span className="flex-1 truncate">{children}</span>
    </span>
  )
}
