import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../use-debounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500))
    expect(result.current).toBe('hello')
  })

  it('updates the value after the delay', () => {
    let value = 'initial'
    const { result, rerender } = renderHook(() => useDebounce(value, 300))

    expect(result.current).toBe('initial')

    value = 'updated'
    rerender()

    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('updated')
  })

  it('only emits the last value after rapid changes', () => {
    let value = 'a'
    const { result, rerender } = renderHook(() => useDebounce(value, 200))

    value = 'b'
    rerender()
    act(() => {
      vi.advanceTimersByTime(50)
    })

    value = 'c'
    rerender()
    act(() => {
      vi.advanceTimersByTime(50)
    })

    value = 'd'
    rerender()

    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current).toBe('d')
  })
})
