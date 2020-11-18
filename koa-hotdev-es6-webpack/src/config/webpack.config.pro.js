const { merge } = require('webpack-merge');

const baseWebpackConfig = require('./webpack.config.base');

const TerserPlugin = require('terser-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  stats: { children: false, warnings: false },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            drop_console: false,
            dead_code: true,
            drop_debugger: false, warnings: false,
          },
          output: {
            comments: false,
            beautify: false,
          },
          mangle: true,
        },
      }),
    ],
  },

})

module.exports = webpackConfig;

// TerserWebpackPlugin webpack4打包工具