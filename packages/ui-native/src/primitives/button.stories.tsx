import type { Meta, StoryObj } from '@storybook/react-native'
import { View, StyleSheet } from 'react-native'
import { Button, ButtonText } from './button'

const meta = {
  title: 'Primitives/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <Button variant="primary" onPress={() => {}}>
      <ButtonText>Continue</ButtonText>
    </Button>
  ),
}

export const Secondary: Story = {
  render: () => (
    <Button variant="secondary" onPress={() => {}}>
      <ButtonText>Cancel</ButtonText>
    </Button>
  ),
}

export const Outline: Story = {
  render: () => (
    <Button variant="outline" onPress={() => {}}>
      <ButtonText>Learn more</ButtonText>
    </Button>
  ),
}

export const Ghost: Story = {
  render: () => (
    <Button variant="ghost" onPress={() => {}}>
      <ButtonText>Skip</ButtonText>
    </Button>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Button variant="destructive" onPress={() => {}}>
      <ButtonText>Delete</ButtonText>
    </Button>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Button variant="primary" disabled onPress={() => {}}>
      <ButtonText>Disabled</ButtonText>
    </Button>
  ),
}

const styles = StyleSheet.create({
  canvas: { padding: 16, alignItems: 'flex-start' },
})
