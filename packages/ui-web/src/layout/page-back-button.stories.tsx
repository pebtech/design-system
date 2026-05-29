import type { Meta, StoryObj } from '@storybook/react'
import {
  PageBackButton,
  type PageBackButtonAppearance,
} from './page-back-button'
import { PageTopWrapper } from './page-top-wrapper'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'

const APPEARANCES: PageBackButtonAppearance[] = [
  'text',
  'ghost',
  'outline',
  'pill',
  'minimal',
  'emphasis',
]

const meta = {
  title: 'Layout/PageBackButton',
  component: PageBackButton,
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: APPEARANCES,
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    iconOnly: { control: 'boolean' },
  },
  args: {
    text: 'Back to Dashboard',
    appearance: 'text',
    size: 'md',
    iconOnly: false,
  },
} satisfies Meta<typeof PageBackButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    onClick: () => {},
  },
}

export const AllAppearances: Story = {
  render: () => (
    <div className="divide-y divide-border rounded-xl border border-border bg-surface">
      {APPEARANCES.map((appearance) => (
        <div
          key={appearance}
          className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:gap-8"
        >
          <Text size="sm" className="w-24 shrink-0 font-medium capitalize text-secondary">
            {appearance}
          </Text>
          <PageBackButton appearance={appearance} text="Back to settings" onClick={() => {}} />
        </div>
      ))}
    </div>
  ),
}

export const TextStyle: Story = {
  name: 'Text',
  args: { appearance: 'text', onClick: () => {} },
}

export const Ghost: Story = {
  args: { appearance: 'ghost', onClick: () => {} },
}

export const Outline: Story = {
  args: { appearance: 'outline', onClick: () => {} },
}

export const Pill: Story = {
  args: { appearance: 'pill', onClick: () => {} },
}

export const Minimal: Story = {
  args: { appearance: 'minimal', onClick: () => {} },
}

export const Emphasis: Story = {
  args: { appearance: 'emphasis', text: 'Return to billing', onClick: () => {} },
}

export const Small: Story = {
  args: { size: 'sm', appearance: 'ghost', onClick: () => {} },
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {(['ghost', 'outline', 'pill'] as const).map((appearance) => (
        <PageBackButton
          key={appearance}
          appearance={appearance}
          iconOnly
          text="Back to projects"
          onClick={() => {}}
        />
      ))}
    </div>
  ),
}

export const AsLink: Story = {
  args: {
    href: '#',
    appearance: 'ghost',
    text: 'Back to team list',
  },
}

export const InPageHeader: Story = {
  render: () => (
    <div className="overflow-hidden rounded-2xl border border-border bg-page">
      <PageTopWrapper>
        <PageBackButton appearance="ghost" text="All campaigns" onClick={() => {}} />
        <div className="flex gap-2">
          <Text size="sm" color="tertiary">
            Draft
          </Text>
        </div>
      </PageTopWrapper>
      <div className="p-6">
        <Heading level={2}>Summer promotion</Heading>
        <Text color="secondary" className="mt-2">
          Page content below a sticky top bar with a ghost back control.
        </Text>
      </div>
    </div>
  ),
}

export const HeaderVariants: Story = {
  render: () => (
    <div className="space-y-4">
      {(['text', 'outline', 'emphasis'] as const).map((appearance) => (
        <div key={appearance} className="overflow-hidden rounded-xl border border-border">
          <PageTopWrapper className="py-3">
            <PageBackButton
              appearance={appearance}
              text="Settings"
              onClick={() => {}}
            />
          </PageTopWrapper>
        </div>
      ))}
    </div>
  ),
}
