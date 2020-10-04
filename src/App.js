import React from 'react'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

import User from 'views/User'

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

queryCache.invalidateQueries('forkData', { exact: true })

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <User />
    </ReactQueryCacheProvider>
  )
}

export default App
