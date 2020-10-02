import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  button: {
    display: 'none',
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

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      onSubmit()
    }
  }

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      data-testid="form"
      aria-label="form"
    >
      <FormControl variant="outlined">
        <StyledLabel htmlFor="component-outlined" className={classes.label}>
          Search
        </StyledLabel>
        <StyledInput
          id="component-outlined"
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeypress}
          label="search"
          inputProps={{
            'data-testid': 'search',
            'aria-label': 'search',
          }}
        />
        <button
          onClick={onSubmit}
          type="submit"
          className={classes.button}
          data-testid="button"
        >
          Submit
        </button>
      </FormControl>
    </form>
  )
}

export default Search
