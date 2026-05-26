import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../utils/cn'

interface Tab {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
  variant?: 'underlined' | 'segmented'
}

// useLayoutEffect warns during SSR; fall back to useEffect when window is unavailable
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function Tabs({ tabs, activeTab, onChange, className, variant = 'underlined' }: TabsProps) {
  const activeIndex = tabs.findIndex((t) => t.id === activeTab)

  const tabListRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  })
  const [hasMeasured, setHasMeasured] = useState(false)

  const measure = useCallback(() => {
    const list = tabListRef.current
    const active = tabRefs.current[activeIndex] ?? null
    if (!list || !active) {
      setIndicator({ left: 0, width: 0 })
      return
    }
    setIndicator({ left: active.offsetLeft, width: active.offsetWidth })
    setHasMeasured(true)
  }, [activeIndex])

  useIsomorphicLayoutEffect(() => {
    measure()
  }, [measure, tabs.length])

  useEffect(() => {
    const list = tabListRef.current
    if (!list || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      measure()
    })
    observer.observe(list)
    return () => observer.disconnect()
  }, [measure])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let nextIndex: number
      if (e.key === 'ArrowRight') {
        nextIndex = (activeIndex + 1) % tabs.length
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (activeIndex - 1 + tabs.length) % tabs.length
      } else if (e.key === 'Home') {
        nextIndex = 0
      } else if (e.key === 'End') {
        nextIndex = tabs.length - 1
      } else {
        return
      }
      e.preventDefault()
      const next = tabs[nextIndex]
      if (next) {
        onChange(next.id)
        const target = e.currentTarget.querySelector<HTMLElement>(
          `[role="tab"][data-tab-id="${next.id}"]`
        )
        target?.focus()
      }
    },
    [activeIndex, tabs, onChange]
  )

  const indicatorVisible = activeIndex !== -1 && indicator.width > 0
  const transitionClass = hasMeasured
    ? 'transition-[transform,width] duration-200 ease-out'
    : 'transition-none'

  if (variant === 'segmented') {
    return (
      <div
        ref={tabListRef}
        role="tablist"
        onKeyDown={handleKeyDown}
        className={cn('relative flex p-1 rounded-xl bg-bodySecondary', className)}
      >
        <div
          aria-hidden="true"
          className={cn(
            'absolute top-1 bottom-1 left-0 z-0 rounded-lg bg-surface shadow-sm',
            transitionClass,
            !indicatorVisible && 'opacity-0'
          )}
          style={{
            transform: `translateX(${indicator.left}px)`,
            width: indicator.width,
          }}
        />
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el
            }}
            type="button"
            role="tab"
            data-tab-id={tab.id}
            aria-selected={activeTab === tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative z-10 flex-1 rounded-lg px-2 py-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-primary',
              activeTab === tab.id ? 'text-brand' : 'text-secondary hover:text-brand'
            )}
          >
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'transition-colors',
                    activeTab === tab.id ? 'text-brand' : 'text-secondary'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('border-b border-border', className)}>
      <div
        ref={tabListRef}
        role="tablist"
        onKeyDown={handleKeyDown}
        className="-mb-px flex space-x-4 relative"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el
            }}
            type="button"
            role="tab"
            data-tab-id={tab.id}
            aria-selected={activeTab === tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              'whitespace-nowrap px-1 pb-4 pt-4 text-sm font-medium transition-colors cursor-pointer hover:text-primary flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-primary',
              activeTab === tab.id ? 'text-brand' : 'text-muted'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded-full text-[10px]',
                  activeTab === tab.id ? 'bg-brand/10 text-brand' : 'bg-quaternaryBg text-muted'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
        <div
          aria-hidden="true"
          className={cn(
            'absolute bottom-0 left-0 h-0.5 bg-brand',
            transitionClass,
            !indicatorVisible && 'opacity-0'
          )}
          style={{
            transform: `translateX(${indicator.left}px)`,
            width: indicator.width,
          }}
        />
      </div>
    </div>
  )
}
