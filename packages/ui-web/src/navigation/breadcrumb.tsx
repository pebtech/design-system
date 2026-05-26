export interface BreadcrumbItem {
    name: string
    href: string
    current: boolean
}

export interface BreadcrumbProps {
    breadcrumbs: BreadcrumbItem[]
    children?: React.ReactNode
}

export function Breadcrumb({ breadcrumbs }: BreadcrumbProps) {
    return (
        <header className={`flex flex-wrap items-center justify-between gap-6 py-1 -ml-2`}>
            <div className="flex items-center gap-2">
                <nav aria-label="Breadcrumb" className="hidden sm:flex">
                    <ol role="list" className="flex items-center -space-x-1">
                        {breadcrumbs.map((breadcrumb, index) => (
                            <li key={index}>
                                <div className="flex items-center">
                                    {index > 0 && (
                                        /* Right arrow separator icon (inline SVG replacing @iconify/react) */
                                        <svg className="size-4 shrink-0 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    )}
                                    <a
                                        href={breadcrumb.href}
                                        aria-current={breadcrumb.current ? 'page' : undefined}
                                        className="cursor-pointer text-xs text-muted hover:text-primary px-2 py-0.5 rounded-md hover:bg-hover-primary"
                                    >
                                        {breadcrumb.name}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </header>
    )
}
