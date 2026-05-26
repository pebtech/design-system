import React, { useRef, createContext, useContext } from 'react'
import { useDialog, useModalOverlay, OverlayContainer, FocusScope, DismissButton } from 'react-aria'
import { useOverlayTriggerState } from 'react-stately'
import { cn } from '../utils/cn'
import { Text } from '../typography/text'

const sizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
}

interface DialogContextValue {
  titleProps?: React.HTMLAttributes<HTMLElement>
}

const DialogContext = createContext<DialogContextValue>({})

export interface DialogProps {
  size?: keyof typeof sizes
  className?: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
  role?: 'dialog' | 'alertdialog'
}

export function Dialog({
  size = 'lg',
  className,
  open,
  onClose,
  children,
  role = 'dialog',
}: DialogProps) {
  const ref = useRef<HTMLDivElement>(null)

  const state = useOverlayTriggerState({
    isOpen: open,
    onOpenChange: (isOpen) => {
      if (!isOpen) onClose()
    },
  })

  const { modalProps, underlayProps } = useModalOverlay(
    {
      isDismissable: true,
    },
    state,
    ref
  )

  const { dialogProps, titleProps } = useDialog({ role }, ref)

  if (!open) return null

  return (
    <OverlayContainer>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          {...underlayProps}
          className="fixed inset-0 bg-overlay px-2 py-2 sm:px-6 sm:py-8 lg:px-8 lg:py-16 transition-opacity"
        />

        {/* Dialog scroll wrapper */}
        <div className="fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0 z-50 pointer-events-none">
          <div className="grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_1fr] sm:p-4 pointer-events-none">
            <FocusScope contain restoreFocus autoFocus>
              <div
                ref={ref}
                {...modalProps}
                {...dialogProps}
                className={cn(
                  className,
                  sizes[size],
                  'row-start-2 w-full min-w-0 rounded-t-3xl bg-surface p-(--gutter) shadow-lg ring-1 ring-border [--gutter:--spacing(8)] sm:mb-auto sm:rounded-2xl forced-colors:outline pointer-events-auto',
                  'transition duration-100 will-change-transform'
                )}
              >
                <DismissButton onDismiss={onClose} />
                <DialogContext.Provider value={{ titleProps }}>
                  {children}
                </DialogContext.Provider>
                <DismissButton onDismiss={onClose} />
              </div>
            </FocusScope>
          </div>
        </div>
      </div>
    </OverlayContainer>
  )
}

export function DialogTitle({
  className,
  children,
  ...props
}: { className?: string; children: React.ReactNode }) {
  const { titleProps } = useContext(DialogContext)
  return (
    <h2
      {...titleProps}
      {...props}
      className={cn(className, 'text-lg/6 font-semibold text-balance text-primary sm:text-base/6')}
    >
      {children}
    </h2>
  )
}

export function DialogDescription({
  className,
  ...props
}: { className?: string; children: React.ReactNode }) {
  return <Text as="p" {...props} className={cn(className, 'mt-2 text-pretty')} />
}

export function DialogBody({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={cn(className, 'mt-6')} />
}

export function DialogActions({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        className,
        'mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'
      )}
    />
  )
}
