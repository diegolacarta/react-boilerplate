import React from 'react'

export default class extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        {this.props.children}
      </div>
    )
  }
}