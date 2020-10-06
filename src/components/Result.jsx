import React from 'react'
import {
  Typography,
  Grid,
  Container,
  Avatar,
  Box,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Card from 'components/Card'
import { StatusView } from 'shared/patterns'

const useStyles = makeStyles({
  h1: {
    paddingLeft: '0.5rem',
  },
  grid: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'baseline',
    paddingTop: 'calc(88px + 2rem)',
  },
  avatar: {
    position: 'relative',
    top: '0.5rem',
    height: '3.75rem',
    width: '3.75rem',
  },
})

function Result({ gists, data, error, isLoading, isFetching }) {
  const classes = useStyles()

  if (data.length > 0 && gists) {
    return (
      <Container>
        <Box display="flex" className={classes.header}>
          <Avatar
            alt="Github user"
            src={data?.[0].owner['avatar_url']}
            className={classes.avatar}
          />{' '}
          <Typography gutterBottom variant="h3" className={classes.h1}>
            {data?.[0].owner.login}
          </Typography>
        </Box>
        <Grid container className={classes.grid} justify="start" spacing={2}>
          {gists.map(f => (
            <Card data={f} />
          ))}
        </Grid>
      </Container>
    )
  }

  return <StatusView value={<CircularProgress />} />
}

export default Result
