import React from 'react'
import { Text } from '../typography/text'
import { cn } from '../utils/cn'

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string
    description?: string
    icon?: React.ReactNode
}

export function Placeholder({ title, description, icon, className, children, ...props }: PlaceholderProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl h-full min-h-[300px]',
                className
            )}
            {...props}
        >
            {icon && (
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full mb-4">
                    {icon}
                </div>
            )}
            {title && (
                <Text weight="medium" className="mb-1">
                    {title}
                </Text>
            )}
            {description && (
                <Text size="sm" color="muted" className="max-w-md">
                    {description}
                </Text>
            )}
            {children}
        </div>
    )
}
