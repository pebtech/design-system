import React, { useRef, createContext, useContext, useEffect, useState } from 'react'
import { useDialog, useModalOverlay, OverlayContainer } from 'react-aria'
import { cn } from '../utils/cn'
import { Text } from '../typography/text'

const sizes = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
}

const DrawerContext = createContext<{ titleProps?: any }>({})

export interface DrawerProps {
    open: boolean
    onClose: (open: boolean) => void
    size?: keyof typeof sizes
    className?: string
    contentClassName?: string
    children: React.ReactNode
}

export function Drawer({
    open,
    onClose,
    size = 'md',
    className,
    contentClassName,
    children,
    ...props
}: DrawerProps) {
    const ref = useRef<HTMLDivElement>(null)
    // Track whether the panel has been mounted long enough to animate in
    const [visible, setVisible] = useState(false)

    const handleClose = () => onClose(false)

    const state = {
        isOpen: open,
        setOpen: (isOpen: boolean) => {
            if (!isOpen) handleClose()
        },
        close: handleClose,
    }

    const { modalProps, underlayProps } = useModalOverlay(
        {
            isDismissable: true,
        },
        state as any,
        ref
    )

    const { dialogProps, titleProps } = useDialog(props as any, ref)

    // Animate in after mount
    useEffect(() => {
        if (open) {
            // Delay to allow the initial render with translate-x-full, then transition in
            const frame = requestAnimationFrame(() => {
                setVisible(true)
            })
            return () => cancelAnimationFrame(frame)
        } else {
            setVisible(false)
        }
    }, [open])

    if (!open) return null

    return (
        <OverlayContainer>
            <div className="relative z-50">
                {/* Backdrop */}
                <div
                    {...underlayProps}
                    className={cn(
                        'fixed inset-0 bg-primary/60 transition duration-500 ease-in-out',
                        visible ? 'opacity-100' : 'opacity-0'
                    )}
                    onClick={handleClose}
                />

                {/* Drawer slide-in panel */}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10 m-3 rounded-2xl">
                            <div
                                ref={ref}
                                {...modalProps}
                                {...dialogProps}
                                className={cn(
                                    className,
                                    sizes[size],
                                    'pointer-events-auto w-screen transform transition duration-500 ease-in-out sm:duration-700 bg-surface shadow-xl rounded-2xl ring-2 ring-body',
                                    visible ? 'translate-x-0' : 'translate-x-full'
                                )}
                            >
                                <div className={cn("flex h-full flex-col shadow-xs overflow-y-scroll scrollbar", contentClassName ?? 'py-6')}>
                                    <DrawerContext.Provider value={{ titleProps }}>
                                        {children}
                                    </DrawerContext.Provider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OverlayContainer>
    )
}

export function DrawerTitle({
    className,
    children,
    ...props
}: { className?: string; children: React.ReactNode }) {
    const { titleProps } = useContext(DrawerContext)
    return (
        <h2
            {...titleProps}
            {...props}
            className={cn(className, 'text-lg font-semibold text-primary px-4 sm:px-6')}
        >
            {children}
        </h2>
    )
}

export function DrawerDescription({
    className,
    children,
    ...props
}: { className?: string; children: React.ReactNode }) {
    return <Text as="p" {...props} className={cn(className, 'mt-1 text-sm text-secondary px-4 sm:px-6')}>{children}</Text>
}

export function DrawerBody({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div {...props} className={cn(className, 'relative mt-6 flex-1 px-4 sm:px-6')} />
}

export function DrawerActions({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return (
        <div
            {...props}
            className={cn(
                className,
                'flex shrink-0 justify-end px-4 py-4 sm:px-6'
            )}
        />
    )
}

export function DrawerHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return (
        <div
            {...props}
            className={cn(
                className,
                'flex shrink-0 justify-between items-center'
            )}
        />
    )
}
