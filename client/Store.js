import {observable} from 'mobx'

export default class Store {
  constructor(state = {todos: []}) {
    this.todos = observable(state.todos)
    this.fetched = state.fetched
  }

  addTodo(todo) {
    this.todos.push(todo)
  }

  fetch() {
    return new Promise((resolve) => {
      if (!this.fetched) {
        setTimeout(() => {
          if (!this.fetched) {
            this.todos.push('async todo')
            this.fetched = true
          }
          resolve()
        }, 1000)
      }
    })
  }
}