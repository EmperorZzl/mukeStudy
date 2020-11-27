const path = require('path');
const nodeExcternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

debugger

const webpackconfig = {
  target: 'node',
  mode: 'development',
  entry: {
    server: path.join(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'eval-source-map',
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

//查看webpack 配置命令
// npx node --inspect-brk  ./node_modules/.bin/webpack --config
//

// module.exports = {
//   target: 'node',
//   entry: path.join(__dirname, 'src/index.js')
// }