import React from 'react'
import express from 'express'
import {renderToString} from 'react-dom/server'
import {RouterContext, match} from 'react-router'
import {Provider} from 'mobx-react'
import morgan from 'morgan'
import compression from 'compression'
import fs from 'fs'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'
const server = express()

server.use(compression())
server.use(morgan('dev'))

const getScripts = () => {
  const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/manifest.json'), 'utf8'))
  return Object.keys(manifest)
    .filter(key => key.endsWith('js'))
    .sort(key => !key.includes('common'))
    .map(key => `<script src="${manifest[key]}"></script>`)
    .join('')
}

let scripts

const DevTools = isProduction
  ? () => null
  : require('mobx-react-devtools').default // eslint-disable-line

if (!isProduction) {
  const webpack = require('webpack') // eslint-disable-line
  const webpackDevMiddleware = require('webpack-dev-middleware') // eslint-disable-line
  const webpackHotMiddleware = require('webpack-hot-middleware') // eslint-disable-line
  const webpackConfig = require('../webpack.config').default // eslint-disable-line

  const compiler = webpack(webpackConfig)

  compiler.plugin('done', () => {
    scripts = getScripts()
    Object.keys(require.cache).forEach((id) => {
      if (/[/\\]client[/\\]/.test(id)) {
        delete require.cache[id]
      }
    })
  })

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
} else {
  scripts = getScripts()
  server.use('/public', express.static('public'))
}

const renderView = async (props) => {
  const Store = require('../client/Store').default // eslint-disable-line
  const store = new Store({todos: ['this is a todo from the server']})
  const promises = props.components
    .filter(component => component.fetchData)
    .map(component => component.fetchData({store}))

  await Promise.race([
    Promise.all(promises),
    new Promise(resolve => setTimeout(resolve, 1000))
  ])

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
      ${scripts}
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