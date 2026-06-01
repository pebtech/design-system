import React, { createContext, useContext, useState } from 'react'
import { lightTokens, darkTokens, type ThemeMode } from '@pebtech/tokens'

type ThemeContextValue = {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  tokens: typeof lightTokens
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
  tokens: lightTokens,
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({
  defaultTheme = 'light',
  children,
}: {
  defaultTheme?: ThemeMode
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme)
  const tokens = theme === 'dark' ? darkTokens : lightTokens

  return (
    <ThemeContext.Provider value={{ theme, setTheme, tokens }}>
      {children}
    </ThemeContext.Provider>
  )
}
