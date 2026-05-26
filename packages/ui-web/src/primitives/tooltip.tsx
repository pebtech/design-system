import React, { useState, useRef, useCallback, useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'

export function Tooltip({
  children,
  text,
  className,
  tooltipClassName,
  maxWidth,
  placement = 'right',
  style,
}: {
  children: React.ReactNode
  text?: string
  className?: string
  tooltipClassName?: string
  maxWidth?: number | string
  placement?: 'top' | 'right' | 'bottom' | 'left'
  style?: React.CSSProperties
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0, transform: '' })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipId = useId()

  const updatePosition = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) return

    let top = 0
    let left = 0
    let transform = ''

    if (placement === 'top') {
      top = rect.top - 8
      left = rect.left + rect.width / 2
      transform = 'translate(-50%, -100%)'
    } else if (placement === 'bottom') {
      top = rect.bottom + 8
      left = rect.left + rect.width / 2
      transform = 'translate(-50%, 0)'
    } else if (placement === 'left') {
      top = rect.top + rect.height / 2
      left = rect.left - 8
      transform = 'translate(-100%, -50%)'
    } else {
      top = rect.top + rect.height / 2
      left = rect.right + 8
      transform = 'translateY(-50%)'
    }

    setPosition({ top, left, transform })
  }, [placement])

  useEffect(() => {
    if (!isVisible) return
    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isVisible, updatePosition])

  const show = useCallback(() => {
    if (!text) return
    setIsVisible(true)
  }, [text])

  const hide = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        tabIndex={0}
        className={className}
        style={style}
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </div>
      {isVisible &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id={tooltipId}
            role="tooltip"
            className={cn(
              'fixed z-50 px-3 py-2 text-xs font-medium leading-5 text-primary bg-surface border border-border rounded-md shadow-sm pointer-events-none whitespace-normal wrap-break-word',
              tooltipClassName
            )}
            style={{
              top: position.top,
              left: position.left,
              transform: position.transform,
              maxWidth,
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  )
}
