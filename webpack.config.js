const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')
const pdf = require('phantom-html2pdf');


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

const plugins = [new HtmlWebpackPlugin(),
    new ExtractTextPlugin("css/[name].css")]

if (isProd) {
    plugins.push(new PrerenderSpaPlugin(
      path.resolve(__dirname, 'static'),
      ['/'],
      { captureAfterTime: 5000 }
    ))


     plugins.push(new WebpackOnBuildPlugin(function() {
        const options = {
   	   html: "static/index.html"
     }

	pdf.convert(options, function(err, result) {
           result.toFile("pdf/cv.pdf", function() {})
	})
    }))
	
} 

const sassLoader = isProd ? sassProd : sassDev

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, "static"),
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
  plugins: plugins,
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
     {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
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
