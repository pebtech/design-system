import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import type React from 'react'
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

export function Drawer({
    open,
    onClose,
    size = 'md',
    className,
    contentClassName,
    children,
    ...props
}: {
    open: boolean
    onClose: (open: boolean) => void
    size?: keyof typeof sizes
    className?: string
    contentClassName?: string
    children: React.ReactNode
} & Omit<Headless.DialogProps, 'as' | 'className' | 'open' | 'onClose'>) {
    return (
        <Headless.Dialog open={open} onClose={onClose} {...props} className="relative z-50">
            <Headless.DialogBackdrop
                transition
                className="fixed inset-0 bg-primary/60 transition duration-500 data-closed:opacity-0 data-enter:ease-in-out data-leave:ease-in-out"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10 m-3 rounded-2xl">
                        <Headless.DialogPanel
                            transition
                            className={clsx(
                                className,
                                sizes[size],
                                'pointer-events-auto w-screen transform transition duration-500 data-closed:translate-x-full data-enter:ease-in-out data-leave:ease-in-out sm:duration-700 bg-surface shadow-xl rounded-2xl ring-2 ring-body'
                            )}
                        >
                            <div className={clsx("flex h-full flex-col shadow-xs overflow-y-scroll scrollbar", contentClassName ?? 'py-6')}>
                                {children}
                            </div>
                        </Headless.DialogPanel>
                    </div>
                </div>
            </div>
        </Headless.Dialog>
    )
}

export function DrawerTitle({
    className,
    ...props
}: { className?: string } & Omit<Headless.DialogTitleProps, 'as' | 'className'>) {
    return (
        <Headless.DialogTitle
            {...props}
            className={clsx(className, 'text-lg font-semibold text-primary px-4 sm:px-6')}
        />
    )
}

export function DrawerDescription({
    className,
    ...props
}: { className?: string } & Omit<Headless.DescriptionProps<typeof Text>, 'as' | 'className'>) {
    return <Headless.Description as={Text} {...props} className={clsx(className, 'mt-1 text-sm text-secondary px-4 sm:px-6')} />
}

export function DrawerBody({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div {...props} className={clsx(className, 'relative mt-6 flex-1 px-4 sm:px-6')} />
}

export function DrawerActions({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return (
        <div
            {...props}
            className={clsx(
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
            className={clsx(
                className,
                'flex shrink-0 justify-between items-center'
            )}
        />
    )
}
