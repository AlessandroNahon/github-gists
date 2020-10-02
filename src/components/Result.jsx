import React from 'react'
import { Typography, Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Card from 'components/Card'

const useStyles = makeStyles({
  h1: {
    paddingTop: 'calc(88px + 2rem)',
  },
  grid: {
    flexGrow: 1,
  },
})

function Result({ gists, data, error, isLoading, isFetching }) {
  const classes = useStyles()

  if (!gists) return <></>

  return isLoading ? (
    <span>Loading...</span>
  ) : error ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <span>Refreshing...</span> : null}
      <Container>
        <Typography gutterBottom variant="h2" className={classes.h1}>
          {data[0].owner.login}
        </Typography>
        <Grid container className={classes.grid} justify="start" spacing={2}>
          {gists.map(f => (
            <Card data={f} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Result
