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

  it('reads an existing value from localStorage', () => {
    localStorage.setItem('existing-key', JSON.stringify('stored-value'))

    const { result } = renderHook(() =>
      useLocalStorage('existing-key', 'fallback'),
    )

    expect(result.current[0]).toBe('stored-value')
  })
})
