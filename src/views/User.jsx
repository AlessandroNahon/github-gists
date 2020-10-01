import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, CircularProgress } from '@material-ui/core'

import { FullView, StatusView } from 'shared/patterns'
import Search from 'components/Search'
import Result from 'components/Result'
import Logo from 'components/Logo'

import { fetchGistsByUser, fetchForksByUrl } from 'api/user'

const StyledAppBar = withStyles({
  root: {
    backgroundColor: '#24292e',
    padding: '0 1rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
})(AppBar)

const User = () => {
  const [name, setName] = useState('')
  const {
    status,
    isLoading,
    isFetching,
    error,
    data: userGists,
    refetch: refetchGists,
  } = useQuery('gistData', () => fetchGistsByUser(name), {
    manual: true,
  })
  const { data: forks, refetch: refetchForks } = useQuery(
    'forkData',
    () => Promise.all(userGists?.map(g => fetchForksByUrl(g['forks_url']))),
    { manual: true, enabled: userGists },
  )

  const onSubmitHandler = e => {
    e.preventDefault()
    refetchGists()
    refetchForks()
  }

  return (
    <FullView>
      <StyledAppBar position="fixed">
        <Logo />{' '}
        <Search value={name} setValue={setName} onSubmit={onSubmitHandler} />
      </StyledAppBar>
      {error || status === 'error' ? (
        <StatusView value={error.message} />
      ) : !userGists ? (
        <StatusView value="Empty, nothing to see here." />
      ) : isLoading || isFetching ? (
        <StatusView value={<CircularProgress />} />
      ) : (
        <Result forks={forks} data={userGists} />
      )}
    </FullView>
  )
}

export default User
