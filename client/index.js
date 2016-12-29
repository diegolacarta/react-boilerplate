import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import Store from './Store'

const DevTools = process.env.NODE_ENV === 'production'
  ? () => null
  : require('mobx-react-devtools').default

const store = new Store(window.initialState)

const render = () => {
  const Main = require('./Main').default // eslint-disable-line
  ReactDOM.render(
    <div>
      <Main store={store} history={browserHistory}/>
      <DevTools/>
    </div>,
    document.querySelector('#appContainer')
  )
}

if (module.hot) {
  module.hot.accept('./Main', render)
}

render()