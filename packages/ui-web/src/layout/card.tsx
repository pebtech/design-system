import { ReactNode } from 'react'
import clsx from 'clsx'

// Define variant types for type safety
type SpacingVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'chart'
type BackgroundVariant = 'surface' | 'body' | 'transparent' | 'bodySecondary' | 'white'
type BorderRadiusVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

// Variant definitions
const spacingVariants: Record<SpacingVariant, string> = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  chart: 'p-4 pb-0',
}

const backgroundVariants: Record<BackgroundVariant, string> = {
  surface: 'bg-surface',
  body: 'bg-body',
  transparent: 'bg-transparent',
  bodySecondary: 'bg-bodySecondary',
  white: 'bg-white',
}

const borderRadiusVariants: Record<BorderRadiusVariant, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

export interface CardProps {
  content?: ReactNode
  children?: ReactNode
  spacing?: SpacingVariant
  background?: BackgroundVariant
  borderRadius?: BorderRadiusVariant
  shadow?: boolean
  border?: boolean
  hover?: boolean
  /** Custom CSS classes that take precedence over default variant styles */
  className?: string
  variant?: 'default' | 'elevated' | 'outlined' | 'minimal' | 'chart' | 'flat'
}

// Predefined variant combinations
const variantPresets = {
  default: {
    spacing: 'md' as SpacingVariant,
    background: 'surface' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: true,
    border: false,
    hover: true,
  },
  elevated: {
    spacing: 'lg' as SpacingVariant,
    background: 'surface' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: true,
    border: false,
    hover: true,
  },
  outlined: {
    spacing: 'md' as SpacingVariant,
    background: 'transparent' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: false,
    border: true,
    hover: false,
  },
  minimal: {
    spacing: 'md' as SpacingVariant,
    background: 'bodySecondary' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: false,
    border: false,
    hover: false,
  },
  chart: {
    spacing: 'chart' as SpacingVariant,
    background: 'bodySecondary' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: false,
    border: false,
    hover: false,
  },
  flat: {
    spacing: 'none' as SpacingVariant,
    background: 'white' as BackgroundVariant,
    borderRadius: 'xl' as BorderRadiusVariant,
    shadow: false,
    border: true,
    hover: false,
  },
}

export function Card({
  content,
  children,
  spacing,
  background,
  borderRadius,
  shadow,
  border,
  hover,
  className,
  variant = 'default',
  ...props
}: CardProps & React.ComponentPropsWithoutRef<'div'>) {
  // Get preset values or use individual props
  const preset = variantPresets[variant]
  const finalSpacing = spacing ?? preset.spacing
  const finalBackground = background ?? preset.background
  const finalBorderRadius = borderRadius ?? preset.borderRadius
  const finalShadow = shadow ?? preset.shadow
  const finalBorder = border ?? preset.border
  const finalHover = hover ?? preset.hover

  return (
    <div
      {...props}
      className={clsx(
        // Base styles (can be overridden by className)
        'relative',
        // Apply variant styles (can be overridden by className)
        !className?.includes('p-') && spacingVariants[finalSpacing],
        !className?.includes('bg-') && backgroundVariants[finalBackground],
        !className?.includes('rounded') && borderRadiusVariants[finalBorderRadius],
        // Conditional styles (can be overridden by className)
        finalShadow && !className?.includes('shadow') && clsx(
          'shadow-sm',
          finalHover && 'hover:shadow-md transition-shadow duration-200'
        ),
        finalBorder && !className?.includes('border') && 'border border-border',
        // Custom className takes highest precedence
        className
      )}
    >
      {/* Support both content prop (legacy) and children */}
      {content ? (
        <div className="flex items-center justify-between">
          {content}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

// Export variant types for external use
export type { SpacingVariant, BackgroundVariant, BorderRadiusVariant }
