import { createContext, useContext } from 'react'

export interface ButtonContextType {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  state?: 'default' | 'loading' | 'disabled' | 'active'
  color?: string
}

export const ButtonContext = createContext<ButtonContextType | null>(null)

export function useButtonContext() {
  return useContext(ButtonContext)
}
