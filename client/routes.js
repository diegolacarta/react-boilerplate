import React from 'react'
import {Route} from 'react-router'
import Root from './pages/Root'
import Profile from './pages/Profile'
import About from './pages/About'

export default (
  <Route path='/' component={Root}>
    <Route path='about' component={About}/>
    <Route path='profile' component={Profile}/>
  </Route>
)