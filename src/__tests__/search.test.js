import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import Search from 'components/Search'

const setup = () => {
  const handleChange = jest.fn().mockName('onChange')
  const handleSubmit = jest.fn().mockName('onSubmit')
  const util = render(
    <Search value="test" setValue={handleChange} onSubmit={handleSubmit} />,
  )
  const input = util.queryByLabelText('Search')
  const button = util.queryAllByTestId('button')
  return {
    input,
    button,
    handleSubmit,
    ...util,
  }
}
afterEach(cleanup)

describe('search input', () => {
  it('renders successfuly', () => {
    const { input } = setup()
    expect(input).toBeTruthy()
  })
})

describe('input value', () => {
  it('updates on change', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')
  })
})

describe('submit value', () => {
  const { input, button, handleSubmit } = setup()
  describe('with empty query', () => {
    it('does not trigger onSubmit function', () => {
      fireEvent.click(button[0])
      expect(handleSubmit).not.toHaveBeenCalled()
    })
  })

  describe('with data inside query', () => {
    it('triggers onSubmit function', () => {
      fireEvent.change(input, { target: { value: 'test' } })
      const isPrevented = fireEvent.click(button[0])
      expect(isPrevented).toBe(true)
    })
  })
})
