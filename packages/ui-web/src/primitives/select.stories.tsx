import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './select'

const meta = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '320px' }}>
      <Select {...args}>
        <option value="">Select an option</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
        <option value="dragonfruit">Dragonfruit</option>
      </Select>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Select disabled>
        <option value="">Select an option</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
      </Select>
    </div>
  ),
}

export const WithSelectedValue: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Select defaultValue="banana">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </Select>
    </div>
  ),
}

export const WithOptGroups: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Select>
        <option value="">Choose a food</option>
        <optgroup label="Fruits">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
        </optgroup>
        <optgroup label="Vegetables">
          <option value="carrot">Carrot</option>
          <option value="broccoli">Broccoli</option>
          <option value="spinach">Spinach</option>
        </optgroup>
      </Select>
    </div>
  ),
}

export const Multiple: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Select multiple>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
      </Select>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Select>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
        <option value="jp">Japan</option>
      </Select>
    </div>
  ),
}
