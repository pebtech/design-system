import React from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from './dialog'

export interface AlertDialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  style?: any
}

export function AlertDialog({ open, onClose, children, ...props }: AlertDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} {...props}>
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
