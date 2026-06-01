import type { Meta, StoryObj } from '@storybook/react-native'
import { View, StyleSheet } from 'react-native'
import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'Primitives/Input',
  component: Input,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <View style={styles.field}>
      <Label>Email</Label>
      <Input placeholder="you@example.com" />
    </View>
  ),
}

export const Disabled: Story = {
  render: () => (
    <View style={styles.field}>
      <Label>Account ID</Label>
      <Input placeholder="Auto-generated" disabled />
    </View>
  ),
}

const styles = StyleSheet.create({
  canvas: { padding: 16, width: '100%', maxWidth: 360 },
  field: { gap: 8 },
})
