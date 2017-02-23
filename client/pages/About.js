import React from 'react'
import {Link} from 'react-router'

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1>This is aasdf</h1>
        <Link to='/profile'>Go to profile</Link>
      </div>
    )
  }
}