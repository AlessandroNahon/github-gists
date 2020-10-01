import React, { createContext, useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import User from 'views/User'
import Login from 'views/Login'

import { reducer, initialState } from 'store/reducer'

export const AuthContext = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <Switch>
          <Route path="/" component={User} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
