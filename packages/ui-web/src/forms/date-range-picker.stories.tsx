import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DateRangePicker } from './date-range-picker'
import type { DateRange } from './date-range-picker'

const meta = {
  title: 'Forms/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | null>(null)
    return (
      <div className="w-80">
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder="Select date range"
        />
      </div>
    )
  },
}
