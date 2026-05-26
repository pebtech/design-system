import clsx from 'clsx'

interface PageBackButtonProps {
    text: string
    className?: string
    onClick?: () => void
}

export function PageBackButton({ text, className, onClick }: PageBackButtonProps) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                'cursor-pointer inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400',
                className
            )}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 fill-zinc-400 dark:fill-zinc-500">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            <span className="text-sm/6 font-normal text-zinc-500 dark:text-zinc-400">{text}</span>
        </div>
    )
}
