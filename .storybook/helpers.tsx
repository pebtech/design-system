import * as React from 'react'

/** Keeps canvas UI in sync when knobs change in the Controls panel. */
export function useArgSyncedState<T>(argValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState(argValue)
  React.useEffect(() => {
    setState(argValue)
  }, [argValue])
  return [state, setState]
}
