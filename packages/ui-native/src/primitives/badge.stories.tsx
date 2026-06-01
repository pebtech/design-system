import type { Meta, StoryObj } from '@storybook/react-native'
import { View, StyleSheet } from 'react-native'
import { Badge } from './badge'
import { Text } from './text'

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Badge>Active</Badge>,
}

export const Colors: Story = {
  render: () => (
    <View style={styles.row}>
      <Badge color="green">Success</Badge>
      <Badge color="red">Error</Badge>
      <Badge color="amber">Warning</Badge>
      <Badge color="zinc">Neutral</Badge>
    </View>
  ),
}

export const WithText: Story = {
  render: () => (
    <View style={styles.inline}>
      <Text weight="medium">Campaign status</Text>
      <Badge color="green">Live</Badge>
    </View>
  ),
}

const styles = StyleSheet.create({
  canvas: { padding: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  inline: { flexDirection: 'row', alignItems: 'center', gap: 8 },
})
