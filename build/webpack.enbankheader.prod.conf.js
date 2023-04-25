/* eslint-disable */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const { srcPath, hashLen, limit } = require('../config');
const packPath = path.resolve(__dirname, '../enbankheader');
let bundleAnalyzerPlugin = {
  plugins: process.env.npm_config_report ? [new BundleAnalyzerPlugin()]: []
}


process.env.NODE_ENV = 'production';
process.noDeprecation = true;

module.exports = merge(bundleAnalyzerPlugin, {
  entry : {
    index: [`${srcPath}/utils/enbankHeader.js`] // 主模块
  },
  output : {
    path      : packPath,
    filename  : `[name].js?v=[chunkhash:${hashLen}]`
  },
  module : {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use : {
          loader : 'url-loader',
          options: {
            limit: limit,
            name : `[name].[ext]?v=[hash:${hashLen}]`
          }
        }
      },
      {
        test   : /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/, // 加上这段代码，这个意思是跳过node_modules目录
        options: {
          presets: ['env'],
          plugins: ['transform-runtime'] // 处理函数
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      // js mini
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
        uglifyOptions: {
          compress: {
            drop_debugger: true, // 移除debugger
            drop_console: true //  // 移除console
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../enbankheader')]
    })
  ],
  performance: {
    hints: false
  },
  devtool: false,
  stats: 'errors-only'
});
