import type { Meta, StoryObj } from '@storybook/react'
import { WizardStepper } from './wizard-stepper'

const meta = {
  title: 'Navigation/WizardStepper',
  component: WizardStepper,
  tags: ['autodocs'],
} satisfies Meta<typeof WizardStepper>

export default meta
type Story = StoryObj<typeof meta>

const steps = ['Account Details', 'Business Info', 'Confirmation']

export const Default: Story = {
  args: {
    steps,
    currentStep: 1,
  },
}

export const AllComplete: Story = {
  args: {
    steps,
    currentStep: 3,
  },
}

export const FirstStep: Story = {
  args: {
    steps,
    currentStep: 0,
  },
}
