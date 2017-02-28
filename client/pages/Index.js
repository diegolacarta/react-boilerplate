import React from 'react'
import {inject, observer} from 'mobx-react'

@inject('store')
@observer
export default class extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <h1>Index</h1>
        <button onClick={this.props.store.fetchData}>Get Data</button>
        <pre>{JSON.stringify(this.props.store.data, null, 2)}</pre>
      </div>
    )
  }
}