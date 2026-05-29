import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPages,
  PaginationPrevious,
  PaginationSimple,
  TablePagination,
  type PaginationAppearance,
} from './pagination'
import { Text } from '../typography/text'

const APPEARANCES: PaginationAppearance[] = ['ghost', 'outline', 'solid', 'minimal', 'compact']

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    canvas: 'wide',
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: APPEARANCES,
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

function usePagedState(initial = 1, totalPages = 12) {
  const [page, setPage] = useState(initial)
  return { page, setPage, totalPages }
}

function NumberedPagination({
  appearance,
  totalPages = 12,
}: {
  appearance: PaginationAppearance
  totalPages?: number
}) {
  const { page, setPage, totalPages: total } = usePagedState(4, totalPages)

  return (
    <Pagination appearance={appearance}>
      <PaginationPrevious
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        iconOnly={appearance === 'compact'}
      />
      <PaginationList>
        <PaginationPages page={page} totalPages={total} onPageChange={setPage} />
      </PaginationList>
      <PaginationNext
        onClick={() => setPage(Math.min(total, page + 1))}
        disabled={page === total}
        iconOnly={appearance === 'compact'}
      />
    </Pagination>
  )
}

export const Playground: Story = {
  args: {
    appearance: 'ghost',
  },
  render: function PlaygroundRender({ appearance = 'ghost' }) {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <NumberedPagination appearance={appearance} />
        <Text size="sm" color="tertiary">
          Use the appearance control to compare styles.
        </Text>
      </div>
    )
  },
}

export const AllAppearances: Story = {
  render: () => (
    <div className="divide-y divide-border rounded-xl border border-border bg-surface">
      {APPEARANCES.map((appearance) => (
        <div
          key={appearance}
          className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <Text size="sm" className="w-24 shrink-0 font-medium capitalize text-secondary">
            {appearance}
          </Text>
          <NumberedPagination appearance={appearance} />
        </div>
      ))}
    </div>
  ),
}

export const Ghost: Story = {
  name: 'Ghost (default)',
  render: () => <NumberedPagination appearance="ghost" />,
}

export const Outline: Story = {
  render: () => <NumberedPagination appearance="outline" />,
}

export const Solid: Story = {
  render: () => <NumberedPagination appearance="solid" />,
}

export const Minimal: Story = {
  render: () => <NumberedPagination appearance="minimal" />,
}

export const Compact: Story = {
  render: () => <NumberedPagination appearance="compact" totalPages={8} />,
}

export const SimplePageOf: Story = {
  name: 'Simple — Page X of Y',
  render: () => {
    const [page, setPage] = useState(3)
    return (
      <div className="flex flex-col gap-8 py-4">
        {(['ghost', 'minimal', 'compact'] as const).map((appearance) => (
          <div key={appearance} className="flex flex-col items-center gap-2">
            <Text size="xs" color="tertiary" className="uppercase tracking-wide">
              {appearance}
            </Text>
            <PaginationSimple
              appearance={appearance}
              page={page}
              totalPages={12}
              onPageChange={setPage}
            />
          </div>
        ))}
      </div>
    )
  },
}

export const SimpleWithNumbers: Story = {
  name: 'Simple — with page numbers',
  render: () => {
    const [page, setPage] = useState(5)
    return (
      <PaginationSimple
        appearance="outline"
        page={page}
        totalPages={20}
        onPageChange={setPage}
        showPageNumbers
      />
    )
  },
}

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(2)
    return (
      <Pagination appearance="outline">
        <PaginationPrevious
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        />
        <PaginationList>
          {[1, 2, 3].map((n) => (
            <PaginationPage key={n} current={page === n} onClick={() => setPage(n)}>
              {n}
            </PaginationPage>
          ))}
        </PaginationList>
        <PaginationNext
          onClick={() => setPage((p) => Math.min(3, p + 1))}
          disabled={page === 3}
        />
      </Pagination>
    )
  },
}

export const ManualComposition: Story = {
  name: 'Manual — first / gap / last',
  render: () => (
    <Pagination appearance="solid">
      <PaginationPrevious disabled />
      <PaginationList>
        <PaginationPage current>1</PaginationPage>
        <PaginationGap />
        <PaginationPage>4</PaginationPage>
        <PaginationPage>5</PaginationPage>
        <PaginationPage>6</PaginationPage>
        <PaginationGap />
        <PaginationPage>24</PaginationPage>
      </PaginationList>
      <PaginationNext />
    </Pagination>
  ),
}

export const CenteredCard: Story = {
  render: () => {
    const [page, setPage] = useState(7)
    const totalPages = 24
    return (
      <div className="mx-auto max-w-md rounded-xl border border-border bg-surface p-8 shadow-sm">
        <Text className="mb-6 text-center" color="secondary" size="sm">
          Browse archive
        </Text>
        <div className="flex justify-center">
          <Pagination appearance="solid">
            <PaginationPrevious
              iconOnly
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            />
            <PaginationList>
              <PaginationPages page={page} totalPages={totalPages} onPageChange={setPage} />
            </PaginationList>
            <PaginationNext
              iconOnly
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      </div>
    )
  },
}

export const TableDefault: Story = {
  name: 'Table — ghost',
  render: () => {
    const [page, setPage] = useState(1)
    return (
      <div className="overflow-hidden rounded-xl border border-border">
        <TablePagination
          appearance="ghost"
          page={page}
          totalPages={10}
          onPageChange={setPage}
          totalItems={95}
          pageSize={10}
          onPageSizeChange={() => {}}
        />
      </div>
    )
  },
}

export const TableOutline: Story = {
  name: 'Table — outline',
  render: () => {
    const [page, setPage] = useState(4)
    return (
      <div className="overflow-hidden rounded-xl border border-border">
        <TablePagination
          appearance="outline"
          page={page}
          totalPages={10}
          onPageChange={setPage}
          totalItems={95}
          pageSize={10}
          onPageSizeChange={() => {}}
        />
      </div>
    )
  },
}

export const TableSolid: Story = {
  name: 'Table — solid',
  render: () => {
    const [page, setPage] = useState(7)
    return (
      <div className="overflow-hidden rounded-xl border border-border">
        <TablePagination
          appearance="solid"
          page={page}
          totalPages={10}
          onPageChange={setPage}
          totalItems={95}
          pageSize={10}
        />
      </div>
    )
  },
}
