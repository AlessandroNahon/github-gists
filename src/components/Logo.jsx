import React from 'react'

import { ReactComponent as GithubLogo } from 'assets/github.svg'
import { ReactComponent as GistLogo } from 'assets/gist.svg'

const Logo = () => {
  return (
    <div>
      <GithubLogo /> <GistLogo />
    </div>
  )
}

export default Logo
