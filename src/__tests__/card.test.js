import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { format } from 'date-fns'

import data from 'data.json'
import forks from 'forks.json'

import Card from 'components/Card'

const mockData = data?.map(g =>
  Object.entries(g.files).map(f => {
    return {
      id: g.id,
      html_url: g['html_url'],
      description: g.description,
      created_at: format(new Date(g['created_at']), 'LLL d yyyy'),
      owner: g.owner,
      ...f[1],
    }
  }),
)

const gistsWithForks = mockData.map((g, index) =>
  g.map(f => {
    return { ...f, forks: forks[index] }
  }),
)

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
