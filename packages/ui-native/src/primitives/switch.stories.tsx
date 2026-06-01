import type { Meta, StoryObj } from '@storybook/react-native'
import { View, StyleSheet } from 'react-native'
import { Switch, SwitchField, SwitchLabel, SwitchDescription } from './switch'

const meta = {
  title: 'Primitives/Switch',
  component: Switch,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SwitchField>
      <SwitchLabel>Push notifications</SwitchLabel>
      <Switch defaultSelected />
    </SwitchField>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <SwitchField>
      <View style={styles.copy}>
        <SwitchLabel>Marketing emails</SwitchLabel>
        <SwitchDescription>Product updates and tips, at most once a week.</SwitchDescription>
      </View>
      <Switch />
    </SwitchField>
  ),
}

export const Disabled: Story = {
  render: () => (
    <SwitchField disabled>
      <SwitchLabel>Requires admin</SwitchLabel>
      <Switch isDisabled />
    </SwitchField>
  ),
}

const styles = StyleSheet.create({
  canvas: { padding: 16, width: '100%', maxWidth: 360 },
  copy: { flex: 1, gap: 4, paddingRight: 12 },
})
