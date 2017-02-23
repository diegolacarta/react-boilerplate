import {observable} from 'mobx'

export default class Store {
  constructor(state = {todos: []}) {
    this.todos = observable(state.todos)
    this.fetched = state.fetched
  }

  addTodo(todo) {
    this.todos.push(todo)
  }

  removeTodo(index) {
    this.todos.splice(index, 1)
  }

  swapTodos(index1, index2) {
    if (index1 < 0 || index1 >= this.todos.length || index2 < 0 || index2 >= this.todos.length) {
      return
    }

    const todo1 = this.todos[index1]
    this.todos[index1] = this.todos[index2]
    this.todos[index2] = todo1
  }

  fetch() {
    return new Promise((resolve) => {
      if (!this.fetched) {
        this.todos.push('fetched todo')
        this.fetched = true
        resolve()
      }
    })
  }
}