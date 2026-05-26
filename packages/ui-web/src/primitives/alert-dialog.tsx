import React from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from './dialog'

export interface AlertDialogProps {
  open: boolean
  onClose: () => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children: React.ReactNode
}

export function AlertDialog({ open, onClose, size = 'md', className, children, ...props }: AlertDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} size={size} className={className} role="alertdialog" {...props}>
      {children}
    </Dialog>
  )
}

export { DialogTitle as AlertDialogTitle }
export { DialogDescription as AlertDialogDescription }
export { DialogBody as AlertDialogBody }
export { DialogActions as AlertDialogActions }
export { DialogTitle as AlertDialogHeader }
export { DialogActions as AlertDialogFooter }
