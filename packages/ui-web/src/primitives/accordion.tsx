import React from 'react'
import { cn } from '../utils/cn'
import { Text } from '../typography/text'

interface AccordionSectionProps {
  id: string
  title: string
  icon?: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
  action?: React.ReactNode
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

export function AccordionSection({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  action,
}: AccordionSectionProps) {
  return (
    <div className="overflow-hidden p-0 relative bg-surface rounded-xl border border-border">
      <div className="flex w-full items-center justify-between p-4 transition-colors hover:bg-hover-primary">
        <button
          type="button"
          onClick={onToggle}
          className="flex flex-1 items-center gap-4 text-left cursor-pointer bg-transparent border-0 p-0"
        >
          {icon && (
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                isOpen ? 'bg-brand/10 text-brand' : 'bg-hover-primary text-muted'
              )}
            >
              {icon}
            </div>
          )}
          <Text color="primary" weight="semibold">
            {title}
          </Text>
          <ChevronDown
            className={cn(
              'size-5 text-muted transition-transform duration-300 ml-auto',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        {action && (
          <div className="flex items-center gap-2 ml-2" onClick={(e) => e.stopPropagation()}>
            {action}
          </div>
        )}
      </div>

      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border p-6 pt-2">{children}</div>
        </div>
      </div>
    </div>
  )
}
