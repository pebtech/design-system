import { useState } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import clsx from 'clsx'
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    setMonth,
    setYear,
    getYear
} from 'date-fns'
import {
    Dropdown,
    DropdownButton,
    DropdownMenu,
    DropdownItem,
} from '../primitives/dropdown'

export interface DatePickerProps {
    value: Date | null
    onChange: (date: Date | null) => void
    placeholder?: string
    className?: string
}

export function DatePicker({
    value,
    onChange,
    placeholder = 'Select date',
    className
}: DatePickerProps) {
    const [currentMonth, setCurrentMonth] = useState(value || new Date())

    const handleDateClick = (day: Date, close: () => void) => {
        onChange(day)
        close()
    }

    const handleClear = () => {
        onChange(null)
    }

    return (
        <Popover className={clsx('relative', className)}>
            {({ close }) => (
                <>
                    <PopoverButton className="outline-none w-full">
                        <div className={`flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-200 px-3 py-2.5 transition-colors cursor-pointer hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 text-left`}>
                            {value ? (
                                <span className="text-sm text-zinc-900 dark:text-white">
                                    {format(value, 'MMM d, yyyy')}
                                </span>
                            ) : (
                                <span className="text-sm text-zinc-500">{placeholder}</span>
                            )}
                            {/* Calendar icon (inline SVG replacing @iconify/react) */}
                            <svg className="h-4 w-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                    </PopoverButton>
                    <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel className="absolute left-0 z-10 mt-2 w-80 rounded-xl bg-white/95 backdrop-blur-xl shadow-lg ring-1 ring-zinc-950/10 dark:bg-zinc-800/95 dark:ring-white/10 p-4">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                    className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    {/* Left arrow icon (inline SVG replacing @iconify/react) */}
                                    <svg className="h-5 w-5 text-zinc-600 dark:text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                                <div className="flex items-center gap-0.5">
                                    <Dropdown>
                                        <DropdownButton as="div" className="outline-none ring-0">
                                            <div className="flex items-center gap-0.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 px-1.5 py-0.5 rounded-md transition-colors">
                                                <span className="text-sm font-medium text-zinc-900 dark:text-white">
                                                    {format(currentMonth, 'MMMM')}
                                                </span>
                                                {/* Down arrow icon (inline SVG replacing @iconify/react) */}
                                                <svg className="h-3 w-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M6 9l6 6 6-6" />
                                                </svg>
                                            </div>
                                        </DropdownButton>
                                        <DropdownMenu className="min-w-[8rem] max-h-60 overflow-y-auto z-50" anchor="bottom">
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <DropdownItem
                                                    key={i}
                                                    className="col-span-full"
                                                    onClick={() => setCurrentMonth(setMonth(currentMonth, i))}
                                                >
                                                    {format(new Date(2000, i, 1), 'MMMM')}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>

                                    <Dropdown>
                                        <DropdownButton as="div" className="outline-none ring-0">
                                            <div className="flex items-center gap-0.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 px-1.5 py-0.5 rounded-md transition-colors">
                                                <span className="text-sm font-medium text-zinc-900 dark:text-white">
                                                    {format(currentMonth, 'yyyy')}
                                                </span>
                                                {/* Down arrow icon (inline SVG replacing @iconify/react) */}
                                                <svg className="h-3 w-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M6 9l6 6 6-6" />
                                                </svg>
                                            </div>
                                        </DropdownButton>
                                        <DropdownMenu className="min-w-[6rem] !max-h-60 overflow-y-auto scrollbar z-50" anchor="bottom">
                                            {(() => {
                                                const currentYear = getYear(new Date())
                                                const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)
                                                return years.map(year => (
                                                    <DropdownItem
                                                        key={year}
                                                        className="col-span-full"
                                                        onClick={() => setCurrentMonth(setYear(currentMonth, year))}
                                                    >
                                                        {year}
                                                    </DropdownItem>
                                                ))
                                            })()}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <button
                                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                    className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    {/* Right arrow icon (inline SVG replacing @iconify/react) */}
                                    <svg className="h-5 w-5 text-zinc-600 dark:text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>

                            {/* Day names */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                    <div key={day} className="text-center text-xs font-medium text-zinc-500 py-1">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar grid */}
                            <div className="grid grid-cols-7 gap-1">
                                {(() => {
                                    const monthStart = startOfMonth(currentMonth)
                                    const monthEnd = endOfMonth(currentMonth)
                                    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
                                    const startDayOfWeek = monthStart.getDay()
                                    const paddingDays = Array(startDayOfWeek).fill(null)

                                    return [...paddingDays, ...days].map((day, index) => {
                                        if (!day) {
                                            return <div key={`padding-${index}`} className="h-8" />
                                        }

                                        const isSelected = value && isSameDay(day, value)

                                        return (
                                            <button
                                                key={day.toISOString()}
                                                onClick={() => handleDateClick(day, close)}
                                                className={clsx(
                                                    'h-8 w-full rounded-lg text-sm transition-colors',
                                                    !isSameMonth(day, currentMonth) && 'text-zinc-300 dark:text-zinc-600',
                                                    isSameMonth(day, currentMonth) && 'text-zinc-900 dark:text-white',
                                                    isSelected && 'bg-brandBg !text-white',
                                                    !isSelected && 'hover:bg-zinc-100 dark:hover:bg-zinc-700'
                                                )}
                                            >
                                                {format(day, 'd')}
                                            </button>
                                        )
                                    })
                                })()}
                            </div>

                            {/* Clear button */}
                            {value && (
                                <button
                                    onClick={handleClear}
                                    className="w-full mt-3 py-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                                >
                                    Clear date
                                </button>
                            )}
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
