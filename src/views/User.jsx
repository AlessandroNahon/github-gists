import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { withStyles } from '@material-ui/core/styles'
import { AppBar } from '@material-ui/core'

import { FullView } from 'shared/patterns'
import Search from 'components/Search'
import Result from 'components/Result'
import Logo from 'components/Logo'

import { fetchGistsByUser, fetchForksByUrl } from 'api/user'

import mockData from '../data.json'

const StyledAppBar = withStyles({
  root: {
    backgroundColor: '#24292e',
    padding: '0 1rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
})(AppBar)

const User = ({ mock = mockData }) => {
  const [name, setName] = useState('kentcdodds')
  // const { isLoading, isFetching, error, data } = useQuery('gistData', () =>
  //   fetchGistsByUser(name),
  // )
  // const { isLoading, isFetching, error, data } = useQuery('forkData', () =>
  //   Promise.all(mock.map(g => fetchForksByUrl(g['forks_url']))),
  // )

  // console.log('forks', data)

  return (
    <FullView>
      <StyledAppBar position="fixed">
        <Logo />{' '}
        <Search
          value={name}
          setValue={setName}
          onSubmit={e => e.preventDefault}
        />
      </StyledAppBar>
      <Result
      // forks={[]}
      // data={[]}
      // isLoading={isLoading}
      // isFetching={isFetching}
      // error={error}
      />
    </FullView>
  )
}

export default User
