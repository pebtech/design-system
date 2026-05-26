import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ToggleGroup, ToggleGroupItem } from '../toggle-group'

describe('ToggleGroup', () => {
  it('renders single selection toggle group', () => {
    const onChange = vi.fn()
    const { getByText } = render(
      <ToggleGroup type="single" defaultValue="a" onChange={onChange}>
        <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      </ToggleGroup>
    )

    const btnA = getByText('Option A').closest('button')
    const btnB = getByText('Option B').closest('button')

    expect(btnA).toHaveAttribute('aria-pressed', 'true')
    expect(btnB).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(btnB!)
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('renders multiple selection toggle group', () => {
    const onChange = vi.fn()
    const { getByText } = render(
      <ToggleGroup type="multiple" defaultValue={['a']} onChange={onChange}>
        <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      </ToggleGroup>
    )

    const btnA = getByText('Option A').closest('button')
    const btnB = getByText('Option B').closest('button')

    expect(btnA).toHaveAttribute('aria-pressed', 'true')
    expect(btnB).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(btnB!)
    expect(onChange).toHaveBeenCalledWith(['a', 'b'])
  })
})
