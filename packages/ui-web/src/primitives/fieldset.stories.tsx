import type { Meta, StoryObj } from '@storybook/react'
import { Fieldset, Legend, FieldGroup, Field, Label, Description, ErrorMessage } from './fieldset'
import { Input } from './input'

const meta = {
  title: 'Primitives/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
} satisfies Meta<typeof Fieldset>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Fieldset>
      <Legend>Personal Information</Legend>
      <FieldGroup>
        <Field>
          <Label>Full Name</Label>
          <Input placeholder="John Doe" />
        </Field>
        <Field>
          <Label>Email</Label>
          <Input type="email" placeholder="john@example.com" />
        </Field>
      </FieldGroup>
    </Fieldset>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Fieldset>
      <Legend>Account Settings</Legend>
      <FieldGroup>
        <Field>
          <Label>Username</Label>
          <Description>Choose a unique username for your account.</Description>
          <Input placeholder="johndoe" />
        </Field>
        <Field>
          <Label>Email</Label>
          <Description>We will send a confirmation email to this address.</Description>
          <Input type="email" placeholder="john@example.com" />
        </Field>
      </FieldGroup>
    </Fieldset>
  ),
}

export const WithError: Story = {
  render: () => (
    <Fieldset>
      <Legend>Create Account</Legend>
      <FieldGroup>
        <Field>
          <Label>Username</Label>
          <Input placeholder="johndoe" invalid />
          <ErrorMessage>This username is already taken.</ErrorMessage>
        </Field>
        <Field>
          <Label>Email</Label>
          <Input type="email" placeholder="john@example.com" invalid />
          <ErrorMessage>Please enter a valid email address.</ErrorMessage>
        </Field>
        <Field>
          <Label>Password</Label>
          <Description>Must be at least 8 characters long.</Description>
          <Input type="password" placeholder="Enter password" />
        </Field>
      </FieldGroup>
    </Fieldset>
  ),
}

export const DisabledFieldset: Story = {
  render: () => (
    <Fieldset disabled>
      <Legend>Disabled Form</Legend>
      <FieldGroup>
        <Field>
          <Label>Name</Label>
          <Input placeholder="John Doe" />
        </Field>
        <Field>
          <Label>Email</Label>
          <Input type="email" placeholder="john@example.com" />
        </Field>
      </FieldGroup>
    </Fieldset>
  ),
}

export const MultipleFieldGroups: Story = {
  render: () => (
    <Fieldset>
      <Legend>Shipping Details</Legend>
      <FieldGroup>
        <Field>
          <Label>First Name</Label>
          <Input placeholder="John" />
        </Field>
        <Field>
          <Label>Last Name</Label>
          <Input placeholder="Doe" />
        </Field>
      </FieldGroup>
      <FieldGroup>
        <Field>
          <Label>Street Address</Label>
          <Input placeholder="123 Main St" />
        </Field>
        <Field>
          <Label>City</Label>
          <Input placeholder="San Francisco" />
        </Field>
        <Field>
          <Label>Zip Code</Label>
          <Description>5-digit US zip code.</Description>
          <Input placeholder="94102" />
        </Field>
      </FieldGroup>
    </Fieldset>
  ),
}

export const SingleField: Story = {
  render: () => (
    <Field>
      <Label>Search</Label>
      <Description>Search for users by name or email.</Description>
      <Input placeholder="Type to search..." />
    </Field>
  ),
}
