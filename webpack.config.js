const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    publicPath: "/",
    filename: 'bundle.js'
  },
  resolve:{
    alias: {
      '@': path.resolve(__dirname)
    }
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: ['mustache-loader']
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
