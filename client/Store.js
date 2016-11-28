import {observable} from 'mobx'

export default class Store {
  constructor(state = {todos: []}) {
    this.todos = observable(state.todos)
  }

  addTodo(todo) {
    this.todos.push(todo)
  }

  fetch() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.todos.push('my async todo')
        resolve()
      }, 1000)
    })
  }
}