import clsx from 'clsx'
import type React from 'react'

export type FormFieldProps = {
  id?: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function FormField({ id, label, required, hint, error, children, className }: FormFieldProps) {
  const hintId = hint ? `${id ?? 'field'}-hint` : undefined
  const errorId = error ? `${id ?? 'field'}-error` : undefined

  return (
    <div className={clsx('grid gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-primary">
        {label}
        {required ? <span className="ml-1 text-error">*</span> : null}
      </label>
      {children}
      {hintId ? (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {errorId ? (
        <p id={errorId} className="text-xs text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
