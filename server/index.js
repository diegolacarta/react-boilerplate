import React from 'react'
import express from 'express'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import {renderToString} from 'react-dom/server'
import {RouterContext, match} from 'react-router'
import {Provider} from 'mobx-react'
import morgan from 'morgan'
import DevTools from 'mobx-react-devtools'
import Store from '../client/Store'
import webpackConfig from '../webpack.config'

const server = express()

const compiler = webpack(webpackConfig)

compiler.plugin('done', () => {
  Object.keys(require.cache).forEach((id) => {
    if (/[/\\]client[/\\]/.test(id)) {
      delete require.cache[id]
    }
  })
})

server.use(morgan('dev'))

server.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  reload: true,
  stats: {
    colors: true
  }
}))

server.use(webpackHotMiddleware(compiler, {
  log: console.log, // eslint-disable-line
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

const renderView = async (props) => {
  const store = new Store({todos: ['this is a todo from the server']})
  const promises = props.components
    .filter(component => component.fetchData)
    .map(component => component.fetchData({store}))

  await Promise.all(promises)

  const appHtml = renderToString(
    <div>
      <Provider store={store}>
        <RouterContext {...props}/>
      </Provider>
      <DevTools/>
    </div>
  )

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>App</title>
    </head>
    <body>
      <main id="appContainer">${appHtml}</main>
      <script>window.initialState = ${JSON.stringify(store)}</script>
      <script src="bundle.js"></script>
    </body>
    </html>
  `
}

server.use((request, response) => {
  const routes = require('../client/routes').default // eslint-disable-line
  match({routes, location: request.url}, async (error, redirectLocation, props) => {
    if (error) {
      response.status(500).send(error.message)
    } else if (redirectLocation) {
      response.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (props) {
      const view = await renderView(props)
      response.send(view)
    } else {
      response.status(404).send('Not found')
    }
  })
})

export default server