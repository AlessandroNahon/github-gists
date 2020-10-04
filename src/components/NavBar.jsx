import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AppBar } from '@material-ui/core'

import Search from 'components/Search'
import Logo from 'components/Logo'

function NavBar({ value, setValue, onSubmitHandler }) {
  const StyledAppBar = withStyles({
    root: {
      backgroundColor: '#24292e',
      padding: '0 1rem',
      flexDirection: 'row',
      alignItems: 'center',
    },
  })(AppBar)

  return (
    <StyledAppBar position="fixed">
      <Logo />{' '}
      <Search value={value} setValue={setValue} onSubmit={onSubmitHandler} />
    </StyledAppBar>
  )
}

export default NavBar
