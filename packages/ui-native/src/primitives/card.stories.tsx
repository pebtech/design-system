import type { Meta, StoryObj } from '@storybook/react-native'
import { View, StyleSheet } from 'react-native'
import { Card } from './card'
import { Text } from './text'
import { Button, ButtonText } from './button'

const meta = {
  title: 'Primitives/Card',
  component: Card,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card style={styles.card}>
      <Text size="lg" weight="semibold">
        Summer promotion
      </Text>
      <Text color="secondary" style={styles.body}>
        Reach customers with a limited-time offer. Draft saved automatically.
      </Text>
      <Button variant="primary" onPress={() => {}}>
        <ButtonText>Continue</ButtonText>
      </Button>
    </Card>
  ),
}

const styles = StyleSheet.create({
  canvas: { padding: 16, width: '100%' },
  card: { gap: 12, padding: 16, maxWidth: 360 },
  body: { marginBottom: 4 },
})
