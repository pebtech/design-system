import { render, screen } from '@testing-library/react'
import React from 'react'
import { LinkProvider, useLink } from '../link-provider'

function LinkConsumer({ href }: { href: string }) {
  const LinkComponent = useLink()
  // useLink() returns a stable component reference from context, so it is
  // safe to render here even though the lint rule flags it. A useMemo wrapper
  // doesn't suppress the rule, so we explicitly disable it.
  // eslint-disable-next-line react-hooks/static-components
  return <LinkComponent href={href}>Test Link</LinkComponent>
}

describe('useLink', () => {
  it('returns an anchor element without provider', () => {
    render(<LinkConsumer href="/default" />)
    const link = screen.getByText('Test Link')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/default')
  })

  it('returns the custom component with provider', () => {
    const CustomLink = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    >(function CustomLink(props, ref) {
      return <a ref={ref} data-custom="true" {...props} />
    })

    render(
      <LinkProvider component={CustomLink}>
        <LinkConsumer href="/custom" />
      </LinkProvider>
    )
    const link = screen.getByText('Test Link')
    expect(link).toHaveAttribute('data-custom', 'true')
    expect(link).toHaveAttribute('href', '/custom')
  })
})
