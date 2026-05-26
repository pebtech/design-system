import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { useLink } from '../providers/link-provider'

export const Link = forwardRef(function Link(
  props: { href: string } & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  const LinkComponent = useLink()
  return (
    <Headless.DataInteractive>
      <LinkComponent {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
