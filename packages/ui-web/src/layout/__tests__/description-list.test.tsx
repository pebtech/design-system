import { render } from '@testing-library/react'
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '../../layout/description-list'

describe('DescriptionList', () => {
  it('renders a dl element', () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionTerm>Name</DescriptionTerm>
        <DescriptionDetails>Alice</DescriptionDetails>
      </DescriptionList>
    )
    expect(container.querySelector('dl')).toBeInTheDocument()
  })

  it('renders dt and dd elements', () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionTerm>Name</DescriptionTerm>
        <DescriptionDetails>Alice</DescriptionDetails>
      </DescriptionList>
    )
    expect(container.querySelector('dt')).toBeInTheDocument()
    expect(container.querySelector('dd')).toBeInTheDocument()
  })
})
