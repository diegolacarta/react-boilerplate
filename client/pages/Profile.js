import React from 'react'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router'

@inject('store')
@observer
export default class Profile extends React.Component {
  static propTypes = {
    store: React.PropTypes.object
  }

  static fetchData({store}) {
    return store.fetch()
  }

  componentDidMount() {
    Profile.fetchData(this.props)
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.props.store.addTodo(event.target.value)
    }
  }

  render() {
    return (
      <div>
        <h1>This is profile</h1>
        <input type='text' onKeyDown={this.onKeyDown}/>
        <ul>
          {this.props.store.todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
        <Link to='/about'>Go to about</Link>
      </div>
    )
  }
}