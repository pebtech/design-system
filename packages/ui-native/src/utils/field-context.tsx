import React, { createContext, useContext, useId } from 'react'

export interface FieldContextType {
  labelId?: string
  descriptionId?: string
  errorId?: string
  disabled?: boolean
  invalid?: boolean
  required?: boolean
}

export const FieldContext = createContext<FieldContextType | null>(null)

export function useFieldContext() {
  return useContext(FieldContext)
}

interface FieldProviderProps {
  children: React.ReactNode
  disabled?: boolean
  invalid?: boolean
  required?: boolean
}

export function FieldProvider({
  children,
  disabled,
  invalid,
  required,
}: FieldProviderProps) {
  const labelId = `field-label-${useId()}`
  const descriptionId = `field-description-${useId()}`
  const errorId = `field-error-${useId()}`

  return (
    <FieldContext.Provider
      value={{
        labelId,
        descriptionId,
        errorId,
        disabled,
        invalid,
        required,
      }}
    >
      {children}
    </FieldContext.Provider>
  )
}
