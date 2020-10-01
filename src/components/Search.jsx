import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}))

const StyledLabel = withStyles({
  root: {
    color: '#fff',
  },
})(InputLabel)

const StyledInput = withStyles({
  root: {
    color: '#fff',
  },
  notchedOutline: {
    borderColor: '#fff',

    '&:hover': {
      borderColor: 'blue',
    },
  },
})(OutlinedInput)

const Search = ({ value, setValue, onSubmit }) => {
  const classes = useStyles()

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <FormControl variant="outlined">
        <StyledLabel htmlFor="component-outlined" className={classes.label}>
          Search
        </StyledLabel>
        <StyledInput
          id="component-outlined"
          value={value}
          onChange={handleChange}
          label="Search"
        />
      </FormControl>
    </form>
  )
}

export default Search
