import type { Meta, StoryObj } from '@storybook/react'
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownLabel,
  DropdownSection,
  DropdownHeading,
} from './dropdown'

const meta = {
  title: 'Primitives/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <Dropdown>
        <DropdownButton>Options</DropdownButton>
        <DropdownMenu>
          <DropdownItem onClick={() => {}}>
            <DropdownLabel>Edit</DropdownLabel>
          </DropdownItem>
          <DropdownItem onClick={() => {}}>
            <DropdownLabel>Duplicate</DropdownLabel>
          </DropdownItem>
          <DropdownItem onClick={() => {}}>
            <DropdownLabel>Archive</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => {}}>
            <DropdownLabel>Delete</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  ),
}

export const WithSections: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <Dropdown>
        <DropdownButton>Actions</DropdownButton>
        <DropdownMenu>
          <DropdownSection>
            <DropdownHeading>Edit</DropdownHeading>
            <DropdownItem onClick={() => {}}>
              <DropdownLabel>Cut</DropdownLabel>
            </DropdownItem>
            <DropdownItem onClick={() => {}}>
              <DropdownLabel>Copy</DropdownLabel>
            </DropdownItem>
            <DropdownItem onClick={() => {}}>
              <DropdownLabel>Paste</DropdownLabel>
            </DropdownItem>
          </DropdownSection>
          <DropdownDivider />
          <DropdownSection>
            <DropdownHeading>View</DropdownHeading>
            <DropdownItem onClick={() => {}}>
              <DropdownLabel>Zoom In</DropdownLabel>
            </DropdownItem>
            <DropdownItem onClick={() => {}}>
              <DropdownLabel>Zoom Out</DropdownLabel>
            </DropdownItem>
            <DropdownItem onClick={() => {}}>
              <DropdownLabel>Reset Zoom</DropdownLabel>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  ),
}

export const WithLinks: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <Dropdown>
        <DropdownButton>Navigate</DropdownButton>
        <DropdownMenu>
          <DropdownItem href="#">
            <DropdownLabel>Dashboard</DropdownLabel>
          </DropdownItem>
          <DropdownItem href="#">
            <DropdownLabel>Settings</DropdownLabel>
          </DropdownItem>
          <DropdownItem href="#">
            <DropdownLabel>Profile</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem href="#">
            <DropdownLabel>Sign Out</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  ),
}

export const DisabledItems: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <Dropdown>
        <DropdownButton>File</DropdownButton>
        <DropdownMenu>
          <DropdownItem onClick={() => {}}>
            <DropdownLabel>New File</DropdownLabel>
          </DropdownItem>
          <DropdownItem onClick={() => {}}>
            <DropdownLabel>Open</DropdownLabel>
          </DropdownItem>
          <DropdownItem onClick={() => {}} disabled>
            <DropdownLabel>Save (disabled)</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => {}} disabled>
            <DropdownLabel>Export (disabled)</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  ),
}

export const ManyItems: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <Dropdown>
        <DropdownButton>Select Country</DropdownButton>
        <DropdownMenu>
          {[
            'United States',
            'United Kingdom',
            'Canada',
            'Australia',
            'Germany',
            'France',
            'Japan',
            'South Korea',
            'Brazil',
            'India',
          ].map((country) => (
            <DropdownItem key={country} onClick={() => {}}>
              <DropdownLabel>{country}</DropdownLabel>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  ),
}
