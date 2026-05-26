import React, { useState, useRef } from 'react'
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
    children: React.ReactNode;
    text?: string;
    className?: string;
    tooltipClassName?: string;
    maxWidth?: number | string;
    placement?: 'top' | 'right' | 'bottom' | 'left'
    style?: React.CSSProperties
}) {
    const [isVisible, setIsVisible] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0, transform: 'translateY(-50%)' })
    const triggerRef = useRef<HTMLDivElement>(null)

    const handleMouseEnter = () => {
        if (!text) return
        const rect = triggerRef.current?.getBoundingClientRect()
        if (rect) {
            let top = 0
            let left = 0
            let transform = 'translateY(-50%)'

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
                // right
                top = rect.top + rect.height / 2
                left = rect.right + 8
                transform = 'translateY(-50%)'
            }

            setPosition({ top, left, transform })
            setIsVisible(true)
        }
    }

    const handleMouseLeave = () => {
        setIsVisible(false)
    }

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
                className={className}
                style={style}
            >
                {children}
            </div>
            {isVisible &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div
                        className={cn("fixed z-50 px-3 py-2 text-xs font-medium leading-5 text-primary bg-surface border border-border rounded-md shadow-sm pointer-events-none whitespace-normal break-words", tooltipClassName)}
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
