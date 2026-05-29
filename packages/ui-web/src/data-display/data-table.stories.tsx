import type { Meta, StoryObj } from '@storybook/react'
import { DataTable, type DataTableColumn } from './data-table'

type SampleRow = {
  id: string
  name: string
  email: string
  role: string
}

const sampleColumns: DataTableColumn<SampleRow>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
]

const sampleData: SampleRow[] = [
  { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'Engineer' },
  { id: '2', name: 'Alan Turing', email: 'alan@example.com', role: 'Mathematician' },
  { id: '3', name: 'Grace Hopper', email: 'grace@example.com', role: 'Admiral' },
]

const meta = {
  title: 'Data Display/DataTable',
  component: DataTable<SampleRow>,
  tags: ['autodocs'],
  parameters: {
    canvas: 'wide',
  },
} satisfies Meta<typeof DataTable<SampleRow>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Team Members',
    columns: sampleColumns,
    data: sampleData,
    rowKey: (row) => row.id,
  },
}

export const Loading: Story = {
  args: {
    title: 'Team Members',
    columns: sampleColumns,
    data: [],
    isLoading: true,
  },
}

export const Empty: Story = {
  args: {
    title: 'Team Members',
    columns: sampleColumns,
    data: [],
  },
}

export const ErrorState: Story = {
  args: {
    title: 'Team Members',
    columns: sampleColumns,
    data: [],
    isError: true,
    errorMessage: 'Failed to load team members.',
  },
}
