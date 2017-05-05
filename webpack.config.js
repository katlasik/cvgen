const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const isProd = process.argv.indexOf('-p') !== -1;

const sassProd = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader!sass-loader'
  })
}

const sassDev =   {
    test: /\.scss$/,
    loaders: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  }

const sassLoader = isProd ? sassProd : sassDev

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      'handlebars': 'handlebars/runtime.js'
    }
  },
  resolveLoader: {
    alias: {
      'hbs': 'handlebars-loader'
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin("css/[name].css")
  ],
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /\.yaml$/,
        loaders: [
          'json-loader',
          'yaml-loader'
        ]
      },
      {
        test: /\.html$/,
        loaders: ['handlebars-template-loader']
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      sassLoader,
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=fonts/[name].[ext]"
     },{
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader"
      },{
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug=true&quality=100'
        ]
      }
    ]
  }
}
