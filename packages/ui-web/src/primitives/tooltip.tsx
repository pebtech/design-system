import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { useTooltipTriggerState } from 'react-stately'
import { useTooltip, useTooltipTrigger } from 'react-aria'
import { cn } from '../utils/cn'

export interface TooltipProps {
  children: React.ReactNode
  text?: string
  className?: string
  tooltipClassName?: string
  maxWidth?: number | string
  placement?: 'top' | 'right' | 'bottom' | 'left'
  style?: React.CSSProperties
}

interface TriggerChildProps {
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onPointerEnter?: React.PointerEventHandler
  onPointerLeave?: React.PointerEventHandler
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
  onKeyDown?: React.KeyboardEventHandler
  className?: string
  style?: React.CSSProperties
  'aria-describedby'?: string
}

function chain<T extends unknown[]>(
  ...callbacks: Array<((...args: T) => void) | undefined>
) {
  return (...args: T) => {
    for (const cb of callbacks) {
      cb?.(...args)
    }
  }
}

export function Tooltip({
  children,
  text,
  className,
  tooltipClassName,
  maxWidth,
  placement = 'right',
  style,
}: TooltipProps) {
  // delay: 0 makes tests deterministic; react-aria's escape handling is still wired.
  const state = useTooltipTriggerState({ delay: 0, closeDelay: 0 })
  const triggerRef = useRef<HTMLElement | null>(null)
  const { triggerProps, tooltipProps } = useTooltipTrigger({}, state, triggerRef)
  const { tooltipProps: ariaTooltipProps } = useTooltip(tooltipProps, state)
  const tooltipId = useId()

  const [position, setPosition] = useState<{
    top: number
    left: number
    transform: string
  }>({ top: 0, left: 0, transform: '' })

  const updatePosition = useCallback(() => {
    const node = triggerRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    let top: number, left: number, transform: string

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

  const isVisible = state.isOpen && !!text

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

  const open = useCallback(() => {
    if (text) state.open(true)
  }, [state, text])

  const close = useCallback(() => {
    state.close(true)
  }, [state])

  // Bridge legacy mouse/focus events to the state machine so that
  // fireEvent.mouseEnter / focus continues to work in tests. The react-aria
  // pointer/keyboard handlers (in triggerProps) are preserved for Escape
  // dismissal and pointer device support.
  // react-aria types its handlers against `FocusableElement` which is a
  // narrower interface than React's default. Cast to plain handlers so we
  // can chain them with our own.
  const ariaOnPointerEnter = triggerProps.onPointerEnter as
    | ((e: React.MouseEvent) => void)
    | undefined
  const ariaOnPointerLeave = triggerProps.onPointerLeave as
    | ((e: React.MouseEvent) => void)
    | undefined
  const ariaOnFocus = triggerProps.onFocus as
    | ((e: React.FocusEvent) => void)
    | undefined
  const ariaOnBlur = triggerProps.onBlur as
    | ((e: React.FocusEvent) => void)
    | undefined
  const ariaOnKeyDown = triggerProps.onKeyDown as
    | ((e: React.KeyboardEvent) => void)
    | undefined

  const handlers = {
    onMouseEnter: chain<[React.MouseEvent]>(ariaOnPointerEnter, open),
    onMouseLeave: chain<[React.MouseEvent]>(ariaOnPointerLeave, close),
    onFocus: chain<[React.FocusEvent]>(ariaOnFocus, open),
    onBlur: chain<[React.FocusEvent]>(ariaOnBlur, close),
    onKeyDown: ariaOnKeyDown,
    'aria-describedby': isVisible ? tooltipId : undefined,
  }

  // Stable callback ref so we don't recreate it each render. The body runs
  // at commit time, not during render.
  const setTriggerNode = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node
  }, [])

  let trigger: React.ReactNode
  if (isValidElement(children)) {
    const child = children as React.ReactElement<TriggerChildProps>
    // setTriggerNode is a stable callback ref; the body runs at commit time,
    // not during render. The lint rule can't tell the difference, so we
    // explicitly disable it here.
    // eslint-disable-next-line react-hooks/refs
    trigger = cloneElement(child, {
      ...handlers,
      ref: setTriggerNode,
      className: cn(child.props.className, className),
      style: { ...child.props.style, ...style },
    } as Partial<TriggerChildProps> & { ref: React.Ref<HTMLElement> })
  } else {
    trigger = (
      <span
        ref={triggerRef as React.Ref<HTMLSpanElement>}
        {...handlers}
        style={{ display: 'inline-block', ...style }}
        className={className}
      >
        {children}
      </span>
    )
  }

  return (
    <>
      {trigger}
      {isVisible &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            {...ariaTooltipProps}
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
