import { render, screen } from '@testing-library/react'
import { DataTable, type DataTableColumn } from '../../data-display/data-table'

type SampleRow = {
  id: string
  name: string
  role: string
}

const columns: DataTableColumn<SampleRow>[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
]

const data: SampleRow[] = [
  { id: '1', name: 'Ada Lovelace', role: 'Engineer' },
  { id: '2', name: 'Grace Hopper', role: 'Admiral' },
]

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} rowKey={(row) => row.id} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  it('renders row cells from data', () => {
    render(<DataTable columns={columns} data={data} rowKey={(row) => row.id} />)
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument()
    expect(screen.getByText('Engineer')).toBeInTheDocument()
    expect(screen.getByText('Admiral')).toBeInTheDocument()
  })

  it('renders the title when provided', () => {
    render(
      <DataTable
        title="Team"
        columns={columns}
        data={data}
        rowKey={(row) => row.id}
      />
    )
    expect(screen.getByText('Team')).toBeInTheDocument()
  })

  it('renders the empty state when no data is provided', () => {
    render(<DataTable columns={columns} data={[]} />)
    expect(screen.getByText('No records found')).toBeInTheDocument()
  })

  it('renders custom cell content', () => {
    const customColumns: DataTableColumn<SampleRow>[] = [
      { key: 'name', header: 'Name' },
      {
        key: 'role',
        header: 'Role',
        cell: (row) => <span data-testid={`role-${row.id}`}>[{row.role}]</span>,
      },
    ]
    render(
      <DataTable columns={customColumns} data={data} rowKey={(row) => row.id} />
    )
    expect(screen.getByTestId('role-1')).toHaveTextContent('[Engineer]')
    expect(screen.getByTestId('role-2')).toHaveTextContent('[Admiral]')
  })
})
