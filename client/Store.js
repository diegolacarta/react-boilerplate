import {observable} from 'mobx'

export default class Store {
  @observable data = {}

  fetchData = () => {
    return fetch('/api/data')
      .then(response => response.json())
      .then((data) => {
        this.data = data
      })
  }
}