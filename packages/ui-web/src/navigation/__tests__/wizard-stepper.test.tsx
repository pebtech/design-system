import { render, screen } from '@testing-library/react'
import { WizardStepper } from '../../navigation/wizard-stepper'

describe('WizardStepper', () => {
  it('renders all step labels', () => {
    render(<WizardStepper currentStep={0} steps={['Details', 'Review', 'Confirm']} />)
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('renders step numbers', () => {
    render(<WizardStepper currentStep={1} steps={['Step A', 'Step B']} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
