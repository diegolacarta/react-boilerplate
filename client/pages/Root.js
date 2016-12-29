import React from 'react'
import {Link} from 'react-router'

export default class Root extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  }

  render() {
    return (
      <div>
        <h1>Hello this is root</h1>
        <nav>
          <ul>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/about'>About</Link></li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    )
  }
}