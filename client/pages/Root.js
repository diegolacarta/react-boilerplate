import React from 'react'

export default class Root extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  }

  render() {
    return (
      <div>
        <h1>Hello this is root</h1>
        {this.props.children}
      </div>
    )
  }
}