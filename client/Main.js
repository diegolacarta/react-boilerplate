import React from 'react'
import {Provider} from 'mobx-react'
import {Router} from 'react-router'
import routes from './routes'

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          {routes}
        </Router>
      </Provider>
    )
  }
}