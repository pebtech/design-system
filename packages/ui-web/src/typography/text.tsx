import { cn } from '../utils/cn'
import { Link } from './link'
import React from 'react'

type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'muted'
  | 'link'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'brand'
  | 'white'
  | 'disabled'

type TextProps<T extends React.ElementType = 'p'> = {
  as?: T
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: TextColor
} & React.ComponentPropsWithoutRef<T>

export function Text<T extends React.ElementType = 'p'>({
  as,
  className,
  size,
  weight,
  color = 'secondary',
  ...props
}: TextProps<T>) {
  const Component = as || 'p'
  const sizes = {
    xs: 'text-xs/5',
    sm: 'text-sm/6',
    base: 'text-base/6',
    lg: 'text-lg/8',
    xl: 'text-xl/8',
    '2xl': 'text-2xl/8',
    '3xl': 'text-3xl/8',
    '4xl': 'text-4xl/8',
    '5xl': 'text-5xl/8',
    '6xl': 'text-6xl/8',
    '7xl': 'text-7xl/8',
  }

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  const colors: Record<TextColor, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    muted: 'text-muted',
    link: 'text-link',
    error: 'text-error',
    success: 'text-success',
    warning: 'text-warning',
    info: 'text-info',
    brand: 'text-brand',
    white: 'text-white',
    disabled: 'text-disabled',
  }

  return (
    <Component
      data-slot="text"
      {...props}
      className={cn(
        size ? sizes[size] : 'text-base/6 sm:text-sm/6',
        weight ? weights[weight] : 'font-normal',
        colors[color],
        className
      )}
    />
  )
}

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        className,
        'text-link underline decoration-link/50 data-hover:decoration-link'
      )}
    />
  )
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
  return <strong {...props} className={cn(className, 'font-medium text-primary')} />
}

export function Code({ className, ...props }: React.ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      {...props}
      className={cn(
        className,
        'rounded-md border border-border px-1 py-0.5 text-sm font-medium text-primary bg-tertiary sm:text-[0.8125rem]'
      )}
    />
  )
}
