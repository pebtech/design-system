import { render } from '@testing-library/react'
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '../../primitives/table'

describe('Table', () => {
  it('renders a table element', () => {
    const { container } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(container.querySelector('table')).toBeInTheDocument()
  })

  it('renders thead element via TableHead', () => {
    const { container } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Col</TableHeader>
          </TableRow>
        </TableHead>
      </Table>
    )
    expect(container.querySelector('thead')).toBeInTheDocument()
  })

  it('renders tbody element via TableBody', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(container.querySelector('tbody')).toBeInTheDocument()
  })

  it('renders tr via TableRow', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>row</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(container.querySelector('tr')).toBeInTheDocument()
  })

  it('renders td via TableCell', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(container.querySelector('td')).toBeInTheDocument()
  })
})
