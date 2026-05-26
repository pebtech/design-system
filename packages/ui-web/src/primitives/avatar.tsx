import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'
import { TouchTarget } from '../utils/touch-target'
import { Link } from '../typography/link'
import { Text } from '../typography/text'

type AvatarProps = {
  src?: string | null
  square?: boolean
  initials?: string
  alt?: string
  className?: string
  initialsClassName?: string
}

export function Avatar({
  src = null,
  square = false,
  initials,
  alt = '',
  className,
  initialsClassName,
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<'span'>) {
  const [imgError, setImgError] = useState(false)
  const showImage = src && !imgError

  return (
    <span
      data-slot="avatar"
      {...props}
      className={clsx(
        className,
        'relative inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1',
        'bg-neutral-200',
        square
          ? 'rounded-(--avatar-radius) *:rounded-(--avatar-radius)'
          : 'rounded-full *:rounded-full'
      )}
    >
      {initials && (
        <Text
          as="span"
          weight="semibold"
          size="sm"
          className={clsx(
            'flex size-full items-center justify-center uppercase select-none',
            initialsClassName
          )}
          aria-hidden={alt ? undefined : 'true'}
        >
          {initials}
        </Text>
      )}
      {showImage && (
        <img
          className="size-full object-cover"
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
        />
      )}
    </span>
  )
}

export const AvatarButton = forwardRef(function AvatarButton(
  {
    src,
    square = false,
    initials,
    alt,
    className,
    ...props
  }: AvatarProps &
    (
      | ({ href?: never } & Omit<Headless.ButtonProps, 'as' | 'className'>)
      | ({ href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>)
    ),
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const classes = clsx(
    className,
    square ? 'rounded-(--avatar-radius)' : 'rounded-full',
    'relative inline-grid focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-brand'
  )

  return typeof props.href === 'string' ? (
    <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      <TouchTarget>
        <Avatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </Link>
  ) : (
    <Headless.Button {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Avatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </Headless.Button>
  )
})
