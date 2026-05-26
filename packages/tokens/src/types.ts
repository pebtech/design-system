export type ThemeMode = 'light' | 'dark'

export type TextTokens = {
  white: string
  black: string
  brand: string
  brandAlt: string
  primary: string
  secondary: string
  tertiary: string
  quaternary: string
  muted: string
  disabled: string
  inverse: string
  link: string
  error: string
  success: string
  warning: string
  info: string
  pending: string
  page: string
  surface: string
  border: string
}

export type BgTokens = {
  brand: string
  body: string
  bodySecondary: string
  formPage: string
  primary: string
  secondary: string
  tertiary: string
  quaternary: string
  surface: string
  inverse: string
  overlay: string
  error: string
  success: string
  warning: string
  info: string
  pending: string
  sidebar: string
  sidebarSecondary: string
  tableHeader: string
}

export type BorderTokens = {
  brand: string
  primary: string
  secondary: string
  focus: string
  error: string
  success: string
  warning: string
  info: string
  pending: string
}

export type HoverTokens = {
  brand: string
  primary: string
  secondary: string
  tertiary: string
  white: string
  surface: string
  surfaceActive: string
  black: string
  page: string
  muted: string
  inverse: string
  link: string
  error: string
  success: string
  disabled: string
}

export type FocusTokens = {
  primary: string
  secondary: string
  error: string
  success: string
  warning: string
  info: string
  pending: string
}

export type InputTokens = {
  default: string
  hover: string
  active: string
  focus: string
  error: string
  success: string
  warning: string
  info: string
  pending: string
  disabled: string
}

export type SemanticTokens = {
  text: TextTokens
  bg: BgTokens
  border: BorderTokens
  hover: HoverTokens
  focus: FocusTokens
  input: InputTokens
}

export type BrandOverrides = {
  name: string
  primaryColor: string
}

