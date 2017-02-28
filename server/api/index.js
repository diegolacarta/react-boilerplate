import express from 'express'
import dataFetcher from './dataFetcher'

const api = new express.Router()

api.get('/data', async (request, response) => {
  response.json(await dataFetcher.fetch())
})

export default api