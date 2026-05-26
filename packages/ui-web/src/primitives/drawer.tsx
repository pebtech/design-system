import React, { useRef, createContext, useContext, useState } from 'react'
import {
    useDialog,
    useModalOverlay,
    OverlayContainer,
    FocusScope,
    DismissButton,
} from 'react-aria'
import { useOverlayTriggerState } from 'react-stately'
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

interface DrawerContextValue {
    titleProps?: React.HTMLAttributes<HTMLElement>
}

const DrawerContext = createContext<DrawerContextValue>({})

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
}: DrawerProps) {
    const ref = useRef<HTMLDivElement>(null)
    // Keep the panel mounted while the closing animation plays.
    const [shouldRender, setShouldRender] = useState(open)

    if (open && !shouldRender) {
        // Mount immediately when opening; the data-state will animate in.
        setShouldRender(true)
    }

    const handleClose = () => onClose(false)

    const state = useOverlayTriggerState({
        isOpen: open,
        onOpenChange: (isOpen) => {
            if (!isOpen) handleClose()
        },
    })

    const { modalProps, underlayProps } = useModalOverlay(
        {
            isDismissable: true,
        },
        state,
        ref
    )

    const { dialogProps, titleProps } = useDialog({}, ref)

    if (!open && !shouldRender) return null

    const dataState = open ? 'open' : 'closed'

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.propertyName !== 'transform') return
        if (!open) setShouldRender(false)
    }

    return (
        <OverlayContainer>
            <div className="relative z-50" data-state={dataState}>
                {/* Backdrop */}
                <div
                    {...underlayProps}
                    data-state={dataState}
                    className={cn(
                        'fixed inset-0 bg-primary/60 transition-opacity duration-300 ease-in-out',
                        'data-[state=open]:opacity-100 data-[state=closed]:opacity-0'
                    )}
                />

                {/* Drawer slide-in panel */}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10 m-3 rounded-2xl">
                            <FocusScope contain restoreFocus autoFocus>
                                <div
                                    ref={ref}
                                    {...modalProps}
                                    {...dialogProps}
                                    data-state={dataState}
                                    onTransitionEnd={handleTransitionEnd}
                                    className={cn(
                                        className,
                                        sizes[size],
                                        'pointer-events-auto w-screen transform transition-transform duration-300 ease-in-out sm:duration-500 bg-surface shadow-xl rounded-2xl ring-2 ring-body',
                                        'data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full'
                                    )}
                                >
                                    <DismissButton onDismiss={handleClose} />
                                    <div className={cn("flex h-full flex-col shadow-xs overflow-y-scroll scrollbar", contentClassName ?? 'py-6')}>
                                        <DrawerContext.Provider value={{ titleProps }}>
                                            {children}
                                        </DrawerContext.Provider>
                                    </div>
                                    <DismissButton onDismiss={handleClose} />
                                </div>
                            </FocusScope>
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
