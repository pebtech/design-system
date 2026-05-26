import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../use-local-storage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the initial value when key does not exist', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default'),
    )
    // After mount, useEffect runs and finds nothing in storage,
    // so the value stays at initialValue.
    expect(result.current[0]).toBe('default')
  })

  it('persists a value to localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage('persist-key', 'initial'),
    )

    act(() => {
      result.current[1]('saved')
    })

    expect(result.current[0]).toBe('saved')
    expect(JSON.parse(localStorage.getItem('persist-key')!)).toBe('saved')
  })

  it('reads an existing value from localStorage after mount', async () => {
    localStorage.setItem('existing-key', JSON.stringify('stored-value'))

    const { result } = renderHook(() =>
      useLocalStorage('existing-key', 'fallback'),
    )

    // The deferred read happens in a useEffect, so we need to wait for it.
    // renderHook with @testing-library/react flushes effects synchronously in act(),
    // so the value should already be updated after renderHook returns.
    expect(result.current[0]).toBe('stored-value')
  })
})
