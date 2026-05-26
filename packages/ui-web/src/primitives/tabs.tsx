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

export function Tabs({ tabs, activeTab, onChange, className, variant = 'underlined' }: TabsProps) {
  if (variant === 'segmented') {
    return (
      <div className={cn('relative flex p-1 rounded-xl bg-bodySecondary', className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex-1 rounded-lg px-2 py-2 text-xs font-semibold transition-colors focus:outline-none',
              activeTab === tab.id ? 'text-brand bg-white shadow-sm' : 'text-secondary hover:text-brand'
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
      <nav className="-mb-px flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative">
            <button
              onClick={() => onChange(tab.id)}
              className={cn(
                'whitespace-nowrap px-1 pb-4 pt-4 text-sm font-medium transition-colors cursor-pointer hover:text-primary flex items-center gap-2',
                activeTab === tab.id ? 'text-brand' : 'text-muted'
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded-full text-[10px]',
                    activeTab === tab.id ? 'bg-brand/10 text-brand' : 'bg-zinc-100 text-muted'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
