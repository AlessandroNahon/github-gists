import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, CircularProgress } from '@material-ui/core'

import { FullView, StatusView } from 'shared/patterns'
import Logo from 'components/Logo'
import Search from 'components/Search'
import Result from 'components/Result'

import { useGists, useGistsWithForks } from 'hooks'

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
    data: userGists,
    refetch,
  } = useGists(value)

  const { data: gistsWithForks, refetch: refetchForks } = useGistsWithForks(
    userGists,
  )

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
      ) : status === 'loading' || isLoading || isFetching ? (
        <StatusView value={<CircularProgress />} />
      ) : (
        <Result gists={gistsWithForks} data={userGists} />
      )}
    </FullView>
  )
}

export default User
