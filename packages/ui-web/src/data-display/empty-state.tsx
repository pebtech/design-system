import clsx from 'clsx'
import type React from 'react'

import { Button } from '../primitives/button'
import { Card } from '../layout/card'
import { Subheading } from '../typography/heading'
import { Text } from '../typography/text'

export type EmptyStateProps = {
  title: React.ReactNode
  description?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  action?: React.ReactNode
  icon?: React.ReactNode
  iconWrapperClassName?: string
  className?: string
  cardVariant?: React.ComponentProps<typeof Card>['variant']
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  action,
  icon,
  iconWrapperClassName,
  className,
  cardVariant,
}: EmptyStateProps) {
  return (
    <Card variant={cardVariant} className={clsx('flex flex-col items-center !py-6 text-center', className)}>
      {icon ? <div className={clsx('text-muted', iconWrapperClassName)}>{icon}</div> : null}

      {typeof title === 'string' ? (
        <Subheading level={4} className="!mb-1">
          {title}
        </Subheading>
      ) : (
        title
      )}

      {description && typeof description === 'string' ? (
        <Text size="xs" color="secondary" className="max-w-md">
          {description}
        </Text>
      ) : description ? (
        description
      ) : null}

      {action ? (
        action
      ) : actionLabel ? (
        <Button variants={{ size: 'xs', variant: 'secondary' }} className="!mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  )
}
