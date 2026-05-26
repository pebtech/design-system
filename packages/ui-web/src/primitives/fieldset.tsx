import * as Headless from '@headlessui/react'
import { cn } from '../utils/cn'
import type React from 'react'

import { FieldProvider, useFieldContext } from '../utils/field-context'

export function Fieldset({
  className,
  ...props
}: { className?: string } & Omit<Headless.FieldsetProps, 'as' | 'className'>) {
  return (
    <Headless.Fieldset
      {...props}
      className={cn(className, '*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6')}
    />
  )
}

export function Legend({
  className,
  ...props
}: { className?: string } & Omit<Headless.LegendProps, 'as' | 'className'>) {
  return (
    <Headless.Legend
      data-slot="legend"
      {...props}
      className={cn(
        className,
        'text-base/6 font-semibold text-primary data-disabled:opacity-50 sm:text-sm/6'
      )}
    />
  )
}

export function FieldGroup({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-slot="control" {...props} className={cn(className, 'space-y-8')} />
}

export function Field({
  className,
  disabled,
  invalid,
  ...props
}: {
  className?: string
  disabled?: boolean
  invalid?: boolean
} & Omit<Headless.FieldProps, 'as' | 'className'>) {
  return (
    <FieldProvider disabled={disabled} invalid={invalid}>
      <Headless.Field
        disabled={disabled}
        {...props}
        className={cn(
          className,
          '[&>[data-slot=label]+[data-slot=control]]:mt-1', // space between label and input
          '[&>[data-slot=label]+[data-slot=description]]:mt-1',
          '[&>[data-slot=description]+[data-slot=control]]:mt-3',
          '[&>[data-slot=control]+[data-slot=description]]:mt-3',
          '[&>[data-slot=control]+[data-slot=error]]:mt-3',
          '*:data-[slot=label]:font-medium'
        )}
      />
    </FieldProvider>
  )
}

export function Label({ className, ...props }: { className?: string } & Omit<Headless.LabelProps, 'as' | 'className'>) {
  const context = useFieldContext()
  if (context) {
    return (
      <label
        data-slot="label"
        id={context.labelId}
        data-disabled={context.disabled || undefined}
        className={cn(
          className,
          'text-base/6 text-primary select-none data-disabled:opacity-50 sm:text-sm/6'
        )}
        {...(props as any)}
      />
    )
  }
  return (
    <Headless.Label
      data-slot="label"
      {...props}
      className={cn(
        className,
        'text-base/6 text-primary select-none data-disabled:opacity-50 sm:text-sm/6'
      )}
    />
  )
}

export function Description({
  className,
  ...props
}: { className?: string } & Omit<Headless.DescriptionProps, 'as' | 'className'>) {
  const context = useFieldContext()
  if (context) {
    return (
      <p
        data-slot="description"
        id={context.descriptionId}
        data-disabled={context.disabled || undefined}
        className={cn(className, 'text-base/6 text-secondary data-disabled:opacity-50 sm:text-sm/6')}
        {...(props as any)}
      />
    )
  }
  return (
    <Headless.Description
      data-slot="description"
      {...props}
      className={cn(className, 'text-base/6 text-secondary data-disabled:opacity-50 sm:text-sm/6')}
    />
  )
}

export function ErrorMessage({
  className,
  ...props
}: { className?: string } & Omit<Headless.DescriptionProps, 'as' | 'className'>) {
  const context = useFieldContext()
  if (context) {
    if (context.invalid === false) return null
    return (
      <p
        data-slot="error"
        id={context.errorId}
        data-disabled={context.disabled || undefined}
        className={cn(className, 'text-base/6 text-error data-disabled:opacity-50 sm:text-sm/6')}
        {...(props as any)}
      />
    )
  }
  return (
    <Headless.Description
      data-slot="error"
      {...props}
      className={cn(className, 'text-base/6 text-error data-disabled:opacity-50 sm:text-sm/6')}
    />
  )
}

