import React, { createContext, useContext } from 'react'

type LinkComponent = React.ForwardRefExoticComponent<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string } & React.RefAttributes<HTMLAnchorElement>
>

const DefaultLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>(
  function DefaultLink(props, ref) {
    return <a ref={ref} {...props} />
  }
)

const LinkContext = createContext<LinkComponent>(DefaultLink)

export function LinkProvider({
  component,
  children,
}: {
  component: LinkComponent
  children: React.ReactNode
}) {
  return <LinkContext.Provider value={component}>{children}</LinkContext.Provider>
}

export function useLink(): LinkComponent {
  return useContext(LinkContext)
}
