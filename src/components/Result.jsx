import React from 'react'
import {
  Link,
  Typography,
  Chip,
  Card,
  CardContent,
  Grid,
  Box,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from '@material-ui/core'
import { ExpandMore, CallSplit } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { format } from 'date-fns'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '25%',
    padding: '1.5 rem',
    margin: '1rem',
  },
  h1: {
    paddingTop: 'calc(88px + 2rem)',
  },
  content: {
    height: 'calc(100% - 3rem)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  grid: {
    flexGrow: 1,
  },
  chips: {
    margin: '2rem 0px',
  },
  forks: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
    margin: '1rem 0px',
  },
  avatar: {
    marginRight: '0.5rem',
  },
  split: {
    position: 'relative',
    top: '0.3rem',
  },
})

function Result({ data, forks }) {
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
          <Card className={classes.root}>
            <CardContent className={classes.content}>
              <Link
                href={f[0]['html_url']}
                target="_blank"
                className={classes.link}
              >
                <Typography gutterBottom variant="h6">
                  {f[0]['created_at']}
                </Typography>

                <Typography gutterBottom variant="subtitle1">
                  {f[0].description}
                </Typography>
                <Box className={classes.chips}>
                  {f.map(d => (
                    <Chip label={d.language} />
                  ))}
                </Box>
              </Link>
              {f[0].forks.length > 0 && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      <CallSplit className={classes.split} /> Forked by (
                      {f[0].forks.length})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography gutterBottom variant="h6">
                      {f[0].forks.map(fork => (
                        <div className={classes.forks}>
                          <Avatar
                            className={classes.avatar}
                            alt="Github user"
                            src={fork.owner['avatar_url']}
                          />
                          <Link href={fork.owner['html_url']} target="_blank">
                            {fork.owner?.login}
                          </Link>
                        </div>
                      ))}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )}
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  )
}

export default Result
