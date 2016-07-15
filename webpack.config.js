var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/react-view/app',
  ],
  output: {
    path: path.join(__dirname, 'public/javascripts/'),
    filename: 'app.js',
    publicPath: '/javascripts/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot' , 'babel-loader'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
