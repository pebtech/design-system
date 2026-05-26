import type { Meta, StoryObj } from '@storybook/react'
import { FormField } from './form-field'
import { Input } from '../primitives/input'

const meta = {
  title: 'Forms/FormField',
  component: FormField,
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'email',
    label: 'Email Address',
    hint: 'We will never share your email.',
    children: <Input id="email" type="email" placeholder="you@example.com" />,
  },
}

export const WithError: Story = {
  args: {
    id: 'username',
    label: 'Username',
    error: 'This username is already taken.',
    children: <Input id="username" type="text" placeholder="Enter username" />,
  },
}

export const Required: Story = {
  args: {
    id: 'password',
    label: 'Password',
    required: true,
    children: <Input id="password" type="password" placeholder="Enter password" />,
  },
}
