import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Root from './pages/Root'
import Index from './pages/Index'

export default (
  <Route path='/' component={Root}>
    <IndexRoute component={Index}/>
  </Route>
)