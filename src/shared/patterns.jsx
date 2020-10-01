import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

const useFullViewStyles = makeStyles({
  root: {
    width: '100vw',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    background: ({ bg }) => (bg === 'dark' ? '#26263E' : '#F7F8FC'),
  },
})

export const FullView = ({ children, ...props }) => {
  const classes = useFullViewStyles(props)

  return (
    <Box
      className={classes.root}
      display={props.display}
      justifyContent={props.justifyContent}
      alignItems={props.alignItems}
      flexDirection={props.flexDirection}
    >
      {children}
    </Box>
  )
}

const StyledBox = withStyles({
  root: {
    height: '100vh',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
})(Box)

export const StatusView = ({ children, value, ...props }) => {
  return (
    <StyledBox display="flex">
      <Typography variant="body1">{value}</Typography>
    </StyledBox>
  )
}
