const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production';

const sassRule = isProd
  ? {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }
  : {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }

const plugins = [
  new HtmlWebpackPlugin({
    title: "Resume"
  }),
  new MiniCssExtractPlugin({
    filename: "css/[name].css"
  })
]

module.exports = {
  mode: isProd ? 'production' : 'development',
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.yaml$/,
        use: ['yaml-loader']
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'handlebars-loader',
          options: {
            ignorePartials: true,
            precompileOptions: {
              knownHelpersOnly: false
            }
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      sassRule,
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/inline'
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext]'
        }
      }
    ]
  }
}
