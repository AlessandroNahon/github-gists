import React, { useState } from 'react'

import { CircularProgress } from '@material-ui/core'

import { FullView, StatusView } from 'shared/patterns'
import NavBar from 'components/NavBar'

import Result from 'components/Result'

import { useGists, useForksByGists } from 'hooks'
import { formatGistsWithForks } from 'utils/data'

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
      <NavBar
        value={value}
        setValue={setValue}
        onSubmitHandler={onSubmitHandler}
      />
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
