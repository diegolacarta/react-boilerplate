import path from 'path'
import webpack from 'webpack' // eslint-disable-line
import ManifestPlugin from 'webpack-manifest-plugin' // eslint-disable-line

const isProduction = process.env.NODE_ENV === 'production'

const publicPath = '/public/'

export default {
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  entry: {
    bundle: [
      './client/index.js',
      ...(isProduction ? [] : ['webpack-hot-middleware/client'])
    ],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'mobx',
      'mobx-react',
      'react-router'
    ]
  },
  watch: !isProduction,
  output: {
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    publicPath,
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [path.resolve(__dirname, './client')],
      loader: ['babel-loader']
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'vendor',
        'common'
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    ...(
      isProduction
        ? []
        : [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin()
        ]
    ),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ManifestPlugin({
      basePath: publicPath,
      writeToFileEmit: true
    })
  ],
  performance: {
    hints: false
  }
}