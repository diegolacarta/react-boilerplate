import fetch from 'isomorphic-fetch'

export default {
  fetch: () => {
    return fetch('http://api.fixer.io/latest?symbols=GBP,EUR')
      .then(response => response.json())
  }
}