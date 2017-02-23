import React from 'react'
import {Provider} from 'mobx-react'
import {Router} from 'react-router'
import routes from './routes'

export default class Main extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }

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