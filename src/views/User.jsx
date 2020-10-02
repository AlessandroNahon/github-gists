import React, { useState } from 'react'
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, CircularProgress } from '@material-ui/core'

import { FullView, StatusView } from 'shared/patterns'
import Search from 'components/Search'
import Result from 'components/Result'
import Logo from 'components/Logo'

import { fetchGistsByUser, fetchForksByUrl } from 'api/user'
import { formatGistsWithForks } from 'utils/data'

const StyledAppBar = withStyles({
  root: {
    backgroundColor: '#24292e',
    padding: '0 1rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
})(AppBar)

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

queryCache.invalidateQueries('forkData', { exact: true })

const User = () => {
  const [value, setValue] = useState('')
  const {
    status,
    isLoading,
    isFetching,
    error,
    isPreviousData,
    data: userGists,
    refetch,
  } = useQuery('gistData', () => fetchGistsByUser(value), {
    enabled: false,
  })
  const { data: forks, refetch: refetchForks } = useQuery(
    'forkData',
    () =>
      userGists &&
      Promise.all(
        userGists?.map(g => fetchForksByUrl(g['forks_url']), {
          enabled: false,
        }),
      ),
  )

  const gistsWithForks = formatGistsWithForks(userGists, forks)

  const onSubmitHandler = e => {
    e.preventDefault()
    if (value) {
      refetch()
      refetchForks()
    }
  }

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <FullView>
        <StyledAppBar position="fixed">
          <Logo />{' '}
          <Search
            value={value}
            setValue={setValue}
            onSubmit={onSubmitHandler}
          />
        </StyledAppBar>
        {error || status === 'error' ? (
          <StatusView value={error.message} />
        ) : !userGists ? (
          <StatusView value="Empty, nothing to see here." />
        ) : status === 'loading' ||
          isLoading ||
          isFetching ||
          isPreviousData ? (
          <StatusView value={<CircularProgress />} />
        ) : (
          <Result gists={gistsWithForks} data={userGists} />
        )}
      </FullView>
    </ReactQueryCacheProvider>
  )
}

export default User
