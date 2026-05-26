import clsx from 'clsx'

interface WizardStepperProps {
    currentStep: number
    steps: string[]
    onStepClick?: (stepIndex: number) => void
}

export function WizardStepper({ currentStep, steps, onStepClick }: WizardStepperProps) {
    return (
        <div className="w-full flex items-center justify-center py-2! border-b border-border">
            <div className="flex items-center">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep
                    const isCurrent = index === currentStep
                    const stepNumber = index + 1
                    const isLast = index === steps.length - 1

                    return (
                        <div key={step} className="flex items-center">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => isCompleted && onStepClick?.(index)}
                                    disabled={!isCompleted}
                                    className={clsx(
                                        "flex items-center gap-2 transition-colors outline-none",
                                        isCompleted ? "cursor-pointer" : "cursor-default"
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "flex size-7 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                                            isCompleted
                                                ? "border-blue-600 bg-blue-600 text-white"
                                                : isCurrent
                                                    ? "border-blue-600 bg-white text-blue-600"
                                                    : "border-zinc-200 bg-white text-zinc-500"
                                        )}
                                    >
                                        {stepNumber}
                                    </div>
                                    <span
                                        className={clsx(
                                            "text-sm font-medium whitespace-nowrap",
                                            isCompleted ? "text-blue-600" :
                                                isCurrent ? "text-blue-600 font-bold" : "text-zinc-500 font-medium"
                                        )}
                                    >
                                        {step}
                                    </span>
                                </button>
                            </div>

                            {!isLast && (
                                <div className={clsx(
                                    "h-px w-12 mx-4",
                                    isCompleted ? "bg-blue-600" : "bg-zinc-200"
                                )} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
