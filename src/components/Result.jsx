import React from 'react'
import { Typography, Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { format } from 'date-fns'

import Card from 'components/Card'

const useStyles = makeStyles({
  h1: {
    paddingTop: 'calc(88px + 2rem)',
  },
  grid: {
    flexGrow: 1,
  },
})

function Result({ data, forks, error, isLoading, isFetching }) {
  const classes = useStyles()

  if (!data || !forks) return <></>

  const gists = data?.map(g =>
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

  const gistsWithForks = gists.map((g, index) =>
    g.map(f => {
      return { ...f, forks: forks[index] }
    }),
  )

  return (
    <Container>
      <Typography gutterBottom variant="h2" className={classes.h1}>
        {data[0].owner.login}
      </Typography>
      <Grid container className={classes.grid} justify="start" spacing={2}>
        {gistsWithForks.map(f => (
          <Card data={f} />
        ))}
      </Grid>
    </Container>
  )
}

export default Result
