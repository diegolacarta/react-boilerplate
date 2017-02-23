import React from 'react'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router'

@inject('store')
@observer
export default class Profile extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
  }

  static fetchData({store}) {
    return store.fetch()
  }

  componentDidMount() {
    Profile.fetchData(this.props)
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      this.props.store.addTodo(event.target.value)
      event.target.value = ''
    }
  }

  removeTodo = (index) => {
    this.props.store.removeTodo(index)
  }

  swapTodos = (index1, index2) => {
    this.props.store.swapTodos(index1, index2)
  }

  render() {
    return (
      <div>
        <h1>This is profile</h1>
        <Link to='/about'>Go to about</Link>
        <div>
          <input type='text' onKeyDown={this.onKeyDown}/>
          <ul>
            {this.props.store.todos.map((todo, index) => (
              <li key={index}>
                <span>{todo}</span>
                <button onClick={() => this.removeTodo(index)}>remove</button>
                <button onClick={() => this.swapTodos(index, index - 1)}>up</button>
                <button onClick={() => this.swapTodos(index, index + 1)}>down</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}