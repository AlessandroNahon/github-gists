import React from 'react'
import { render, cleanup } from '@testing-library/react'

import data from 'data.json'
import forks from 'forks.json'

import { formatGistsWithForks } from 'utils/data'

import Card from 'components/Card'

const gistsWithForks = formatGistsWithForks(data, forks)

const setup = () => {
  const util = render(<Card data={gistsWithForks[0]} />)
  const card = util.queryByLabelText('card')
  return {
    card,
    ...util,
  }
}

afterEach(cleanup)
it('renders successfuly', () => {
  const { card } = setup()
  expect(card).toBeTruthy()
})
