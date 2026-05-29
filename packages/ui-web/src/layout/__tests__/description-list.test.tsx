import { render, screen } from '@testing-library/react'
import {
  DescriptionList,
  DescriptionListItem,
  DescriptionTerm,
  DescriptionDetails,
} from '../../layout/description-list'

describe('DescriptionList', () => {
  it('renders a dl element', () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionListItem term="Name">Alice</DescriptionListItem>
      </DescriptionList>,
    )
    expect(container.querySelector('dl')).toBeInTheDocument()
  })

  it('renders dt and dd inside an item row', () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionListItem term="Name">Alice</DescriptionListItem>
      </DescriptionList>,
    )
    expect(container.querySelector('dt')).toHaveTextContent('Name')
    expect(container.querySelector('dd')).toHaveTextContent('Alice')
  })

  it('supports legacy term/details children', () => {
    render(
      <DescriptionList>
        <DescriptionTerm>Name</DescriptionTerm>
        <DescriptionDetails>Alice</DescriptionDetails>
      </DescriptionList>,
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })
})
