const path = require('path');
const utils = require('./utils');
const nodeExcternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

debugger

const webpackconfig = {
  target: 'node',
  entry: {
    server: path.join(utils.APP_PATH, '../src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.DIST_PATH,
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: [nodeExcternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin
      ({
        'process.env': {
          NODE_ENV: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV == 'prod') ? "'production'" : "'development'"
        }
      })
  ],
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    _filename: true,
    _dirname: true,
    setImmediate: true,
    path: true,

  }
}
console.log(webpackconfig);
module.exports = webpackconfig;


