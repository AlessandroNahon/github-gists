import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, CircularProgress } from '@material-ui/core'

import { FullView, StatusView } from 'shared/patterns'
import Logo from 'components/Logo'
import Search from 'components/Search'
import Result from 'components/Result'

import { useGists, useForksByGists } from 'hooks'
import { formatGistsWithForks } from 'utils/data'

const StyledAppBar = withStyles({
  root: {
    backgroundColor: '#24292e',
    padding: '0 1rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
})(AppBar)

function User() {
  const [value, setValue] = useState('')

  const {
    status,
    isLoading,
    isFetching,
    error,
    isPreviousData,
    data: userGists,
    refetch,
  } = useGists(value)

  const { data: forks, refetch: refetchForks } = useForksByGists(userGists)

  const gistsWithForks = formatGistsWithForks(userGists, forks)

  const onSubmitHandler = e => {
    e.preventDefault()
    if (value) {
      refetch()
      refetchForks()
      setValue('')
    }
  }

  return (
    <FullView>
      <StyledAppBar position="fixed">
        <Logo />{' '}
        <Search value={value} setValue={setValue} onSubmit={onSubmitHandler} />
      </StyledAppBar>
      {error || status === 'error' ? (
        <StatusView value={error.message} />
      ) : !userGists ? (
        <StatusView value="Empty, nothing to see here." />
      ) : status === 'loading' || isLoading || isFetching || isPreviousData ? (
        <StatusView value={<CircularProgress />} />
      ) : (
        <Result gists={gistsWithForks} data={userGists} />
      )}
    </FullView>
  )
}

export default User
