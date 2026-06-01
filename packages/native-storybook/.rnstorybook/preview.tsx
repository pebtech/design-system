import type { Preview } from '@storybook/react-native'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@pebtech/ui-native'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaProvider>
          <ThemeProvider defaultTheme="light">
            <Story />
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    ),
  ],
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})

export default preview
