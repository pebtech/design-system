import React, { ReactNode } from 'react'
import { cn } from '../utils/cn'

// Define variant types for type safety
type PageSpacingVariant = 'none' | 'sm' | 'md' | 'lg';
type PageBackgroundVariant = 'white' | 'body' | 'transparent' | 'bodySecondary';
type PageBorderRadiusVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
type PageMaxWidthVariant = 'none' | 'md' | 'lg' | 'xl' | '2xl' | 'screen-xl' | '1440';

// Variant definitions
const spacingVariants: Record<PageSpacingVariant, string> = {
  none: 'p-0',
  sm: 'p-4 lg:p-6',
  md: 'p-6 lg:p-10',
  lg: 'p-8 lg:p-12',
};

const backgroundVariants: Record<PageBackgroundVariant, string> = {
  white: 'bg-surface',
  body: 'bg-body',
  transparent: 'bg-transparent',
  bodySecondary: 'bg-bodySecondary',
};

const borderRadiusVariants: Record<PageBorderRadiusVariant, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

const maxWidthVariants: Record<PageMaxWidthVariant, string> = {
  none: 'max-w-none',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  'screen-xl': 'max-w-screen-xl',
  '1440': 'max-w-[1440px]',
};

export interface PageCardProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
  spacing?: PageSpacingVariant;
  background?: PageBackgroundVariant;
  borderRadius?: PageBorderRadiusVariant;
  maxWidth?: PageMaxWidthVariant;
  shadow?: boolean;
  border?: boolean;
  /** Custom CSS classes for the outer container that take precedence over default variant styles */
  className?: string;
  /** Custom CSS classes for the inner content container */
  bodyClassName?: string;
  variant?: 'default' | 'flat' | 'transparent' | 'dataheavy';
}

// Predefined variant combinations
const variantPresets = {
  default: {
    spacing: 'md' as PageSpacingVariant,
    background: 'white' as PageBackgroundVariant,
    borderRadius: '2xl' as PageBorderRadiusVariant,
    maxWidth: '1440' as PageMaxWidthVariant,
    shadow: true,
    border: true,
  },
  flat: {
    spacing: 'md' as PageSpacingVariant,
    background: 'white' as PageBackgroundVariant,
    borderRadius: '2xl' as PageBorderRadiusVariant,
    maxWidth: '1440' as PageMaxWidthVariant,
    shadow: false,
    border: false,
  },
  transparent: {
    spacing: 'md' as PageSpacingVariant,
    background: 'transparent' as PageBackgroundVariant,
    borderRadius: 'none' as PageBorderRadiusVariant,
    maxWidth: '1440' as PageMaxWidthVariant,
    shadow: false,
    border: false,
  },
  dataheavy: {
    spacing: 'md' as PageSpacingVariant,
    background: 'bodySecondary' as PageBackgroundVariant,
    borderRadius: '2xl' as PageBorderRadiusVariant,
    maxWidth: '1440' as PageMaxWidthVariant,
    shadow: false,
    border: false,
  },
};

export function PageCard({
  children,
  spacing,
  background,
  borderRadius,
  maxWidth,
  shadow,
  border,
  className,
  bodyClassName,
  variant = 'default',
  ...props
}: PageCardProps) {
  // Get preset values or use individual props
  const preset = variantPresets[variant];
  const finalSpacing = spacing ?? preset.spacing;
  const finalBackground = background ?? preset.background;
  const finalBorderRadius = borderRadius ?? preset.borderRadius;
  const finalMaxWidth = maxWidth ?? preset.maxWidth;
  const finalShadow = shadow ?? preset.shadow;
  const finalBorder = border ?? preset.border;

  return (
    <div
      {...props}
      className={cn(
        'relative h-full',
        backgroundVariants[finalBackground],
        borderRadiusVariants[finalBorderRadius],
        finalShadow && 'shadow-sm',
        finalBorder && 'border border-border',
        className
      )}
    >
      <div className="h-full overflow-auto scrollbar">
        <div
          className={cn(
            'mx-auto',
            spacingVariants[finalSpacing],
            maxWidthVariants[finalMaxWidth],
            bodyClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// Export variant types for external use
export type { PageSpacingVariant, PageBackgroundVariant, PageBorderRadiusVariant, PageMaxWidthVariant };
