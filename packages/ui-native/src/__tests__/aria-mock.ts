/**
 * Minimal stubs for the react-native-aria / react-stately surface that our
 * primitives import. The exports-shape test only needs these calls to be
 * defined; it never renders. If we tried to load the real packages under Node,
 * they reach into `react-native` via CJS requires that bypass vite's alias.
 */
const noopHooks = {
  // react-native-aria / @react-native-aria/switch
  useButton: () => ({ buttonProps: {}, isPressed: false }),
  useSwitch: () => ({ inputProps: {} }),
  // react-stately
  useToggleState: () => ({
    isSelected: false,
    setSelected: (_v: boolean) => {},
    toggle: () => {},
  }),
}

export const useButton = noopHooks.useButton
export const useSwitch = noopHooks.useSwitch
export const useToggleState = noopHooks.useToggleState

export default noopHooks
