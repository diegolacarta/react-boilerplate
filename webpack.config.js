import path from 'path'
import webpack from 'webpack'

export default {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    filename: './bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [path.resolve(__dirname, './client')],
      loader: ['babel-loader']
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}