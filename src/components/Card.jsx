import React from 'react'
import {
  Link,
  Typography,
  Chip,
  Card,
  CardContent,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExpandMore, CallSplit } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '25%',
    padding: '1.5 rem',
    margin: '1rem',
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

function CardComponent({ data }) {
  const classes = useStyles()

  return (
    <Card className={classes.root} aria-label="card">
      <CardContent className={classes.content}>
        <Link
          aria-label="link"
          href={data?.[0]['html_url']}
          target="_blank"
          className={classes.link}
        >
          <Typography gutterBottom variant="h6">
            {data?.[0]['created_at']}
          </Typography>

          <Typography gutterBottom variant="subtitle1">
            {data?.[0].description}
          </Typography>
          <Box className={classes.chips}>
            {data?.map(d => (
              <Chip key={d['raw_url']} label={d.language} />
            ))}
          </Box>
        </Link>
        {data?.[0].forks?.length > 0 && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                <CallSplit className={classes.split} /> Forked by (
                {data?.[0].forks?.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography gutterBottom variant="h6">
                {data?.[0].forks?.map(fork => (
                  <div key={fork.owner?.login} className={classes.forks}>
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
  )
}

export default CardComponent
