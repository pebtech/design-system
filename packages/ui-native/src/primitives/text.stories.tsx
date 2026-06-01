import type { Meta, StoryObj } from '@storybook/react-native'
import { View, StyleSheet } from 'react-native'
import { Text } from './text'

const meta = {
  title: 'Primitives/Text',
  component: Text,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    size: 'base',
    color: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Supporting description text',
    size: 'sm',
    color: 'secondary',
  },
}

export const HeadingScale: Story = {
  render: () => (
    <View style={styles.stack}>
      <Text size="3xl" weight="bold">
        Display
      </Text>
      <Text size="2xl" weight="semibold">
        Title
      </Text>
      <Text size="lg" weight="medium">
        Subtitle
      </Text>
      <Text size="base">Body</Text>
      <Text size="sm" color="tertiary">
        Caption
      </Text>
    </View>
  ),
}

const styles = StyleSheet.create({
  canvas: { padding: 16 },
  stack: { gap: 8 },
})
