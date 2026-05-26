import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarButton } from './avatar'

const meta = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitials: Story = {
  args: {
    initials: 'AB',
    className: 'size-10',
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150',
    alt: 'User avatar',
    className: 'size-10',
  },
}

export const Square: Story = {
  args: {
    initials: 'SQ',
    square: true,
    className: 'size-10',
  },
}

export const SquareWithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=square',
    alt: 'Square avatar',
    square: true,
    className: 'size-10',
  },
}

export const CustomSize: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar initials="XS" className="size-6" />
      <Avatar initials="SM" className="size-8" />
      <Avatar initials="MD" className="size-10" />
      <Avatar initials="LG" className="size-14" />
      <Avatar initials="XL" className="size-20" />
    </div>
  ),
}

export const CustomSizeWithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar src="https://i.pravatar.cc/150?u=xs" alt="Extra small" className="size-6" />
      <Avatar src="https://i.pravatar.cc/150?u=sm" alt="Small" className="size-8" />
      <Avatar src="https://i.pravatar.cc/150?u=md" alt="Medium" className="size-10" />
      <Avatar src="https://i.pravatar.cc/150?u=lg" alt="Large" className="size-14" />
      <Avatar src="https://i.pravatar.cc/150?u=xl" alt="Extra large" className="size-20" />
    </div>
  ),
}

export const AvatarButtonStory: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <AvatarButton initials="BT" className="size-10" />
      <AvatarButton src="https://i.pravatar.cc/150?u=btn" alt="Button avatar" className="size-10" />
      <AvatarButton initials="SQ" square className="size-10" />
    </div>
  ),
}

export const AvatarButtonWithHref: Story = {
  render: () => (
    <AvatarButton
      src="https://i.pravatar.cc/150?u=link"
      alt="Link avatar"
      href="#"
      className="size-10"
    />
  ),
}

export const InitialsVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar initials="A" className="size-10" />
      <Avatar initials="BC" className="size-10" />
      <Avatar initials="DEF" className="size-10" />
    </div>
  ),
}

export const CustomInitialsClassName: Story = {
  args: {
    initials: 'CL',
    className: 'size-10',
    initialsClassName: 'text-indigo-600',
  },
}
