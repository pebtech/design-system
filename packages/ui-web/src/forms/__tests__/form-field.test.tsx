import { render, screen } from '@testing-library/react'
import { FormField } from '../../forms/form-field'

describe('FormField', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <FormField label="Name">
        <input />
      </FormField>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders label text', () => {
    render(
      <FormField label="Email">
        <input />
      </FormField>
    )
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(
      <FormField label="Name" error="Required field">
        <input />
      </FormField>
    )
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('renders required indicator', () => {
    render(
      <FormField label="Name" required>
        <input />
      </FormField>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })
})
