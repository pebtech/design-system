import { render } from '@testing-library/react'
import { Breadcrumb } from '../../navigation/breadcrumb'

describe('Breadcrumb', () => {
  it('renders a nav element', () => {
    const { container } = render(
      <Breadcrumb
        breadcrumbs={[
          { name: 'Home', href: '/', current: false },
          { name: 'Products', href: '/products', current: true },
        ]}
      />
    )
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('renders breadcrumb items', () => {
    const { getByText } = render(
      <Breadcrumb
        breadcrumbs={[
          { name: 'Home', href: '/', current: false },
          { name: 'Products', href: '/products', current: true },
        ]}
      />
    )
    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('Products')).toBeInTheDocument()
  })
})
