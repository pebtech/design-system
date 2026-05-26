import React from 'react'
import { render, screen } from '@testing-library/react'
import { AlertDialog, AlertDialogTitle } from '../alert-dialog'

describe('AlertDialog', () => {
  it('renders content when open', () => {
    render(
      <AlertDialog open={true} onClose={() => {}}>
        <AlertDialogTitle>Delete Account</AlertDialogTitle>
        <p>Warning message</p>
      </AlertDialog>
    )
    expect(screen.getByText('Delete Account')).toBeInTheDocument()
    expect(screen.getByText('Warning message')).toBeInTheDocument()
  })

  it('renders as alertdialog role', () => {
    render(
      <AlertDialog open={true} onClose={() => {}}>
        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
      </AlertDialog>
    )
    const dialog = screen.getByRole('alertdialog')
    expect(dialog).toBeInTheDocument()
  })
})
