import clsx from 'clsx'

interface ChipSelectorProps {
    value: string | string[]
    onChange: (value: any) => void
    options: string[]
    multiple?: boolean
    className?: string
}

export function ChipSelector({ value, onChange, options, multiple = false, className }: ChipSelectorProps) {
    const isSelected = (option: string) => {
        if (multiple) {
            return Array.isArray(value) ? value.includes(option) : false
        }
        return value === option
    }

    const handleChange = (option: string) => {
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : []
            const newValues = currentValues.includes(option)
                ? currentValues.filter((v) => v !== option)
                : [...currentValues, option]
            onChange(newValues)
        } else {
            onChange(option)
        }
    }

    return (
        <div className={clsx("flex flex-wrap gap-2", className)}>
            {options.map((option) => {
                const selected = isSelected(option)
                return (
                    <label
                        key={option}
                        className={clsx(
                            "relative flex cursor-pointer items-center justify-center rounded-xl border px-2.5 py-1.5 text-center text-[13px] ring-1 ring-transparent transition-all duration-200",
                            selected
                                ? "border-indigo-200 bg-indigo-100 text-indigo-800 ring-indigo-200 dark:border-indigo-800/50 dark:bg-indigo-800/30 dark:text-indigo-500 dark:ring-indigo-800/50"
                                : "border-zinc-200 bg-white text-zinc-800 hover:border-indigo-600 hover:ring-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:ring-zinc-600"
                        )}
                    >
                        <input
                            type={multiple ? "checkbox" : "radio"}
                            name={multiple ? undefined : "chip-selector"}
                            className="peer hidden"
                            checked={selected}
                            onChange={() => handleChange(option)}
                        />
                        <span
                            className={clsx(
                                "flex shrink-0 items-center justify-center rounded-full bg-indigo-500 text-transparent transition-all duration-200",
                                selected ? "mr-1.5 size-4 text-white" : "size-0"
                            )}
                        >
                            <svg
                                className="shrink-0 size-2.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                        </span>
                        <span className="block">{option}</span>
                    </label>
                )
            })}
        </div>
    )
}
