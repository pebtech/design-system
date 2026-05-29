import type { ArgTypes } from '@storybook/react'

/** Slider-style control for 0–100 progress-style values. */
export const percentValueControl = {
  control: { type: 'range' as const, min: 0, max: 100, step: 1 },
}

export const progressArgTypes: ArgTypes = {
  value: percentValueControl,
  max: { control: { type: 'number', min: 1, max: 1000, step: 1 } },
  color: {
    control: 'select',
    options: ['indigo', 'green', 'red', 'amber', 'blue', 'zinc', 'cyan', 'purple', 'brand'],
  },
}

export const buttonArgTypes: ArgTypes = {
  preset: {
    control: 'select',
    options: ['default', 'secondary', 'ghost', 'outline', 'destructive'],
  },
  disabled: { control: 'boolean' },
  children: { control: 'text' },
}

export const checkboxArgTypes: ArgTypes = {
  defaultSelected: { control: 'boolean', name: 'Initially checked' },
  isDisabled: { control: 'boolean' },
  isIndeterminate: { control: 'boolean' },
  color: {
    control: 'select',
    options: ['brand', 'red', 'green', 'blue', 'indigo', 'purple', 'amber', 'zinc'],
  },
}

export const inputArgTypes: ArgTypes = {
  placeholder: { control: 'text' },
  disabled: { control: 'boolean' },
  type: {
    control: 'select',
    options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
  },
}

export const toggleArgTypes: ArgTypes = {
  defaultSelected: { control: 'boolean', name: 'Initially pressed' },
  isDisabled: { control: 'boolean' },
  children: { control: 'text' },
}
