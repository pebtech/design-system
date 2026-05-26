import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TablePagination } from './pagination'

const meta = {
  title: 'Navigation/Pagination',
  component: TablePagination,
  tags: ['autodocs'],
} satisfies Meta<typeof TablePagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return (
      <TablePagination
        page={page}
        totalPages={10}
        onPageChange={setPage}
        totalItems={95}
        pageSize={10}
      />
    )
  },
}
