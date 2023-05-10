const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { dllStaticList } = require('../config');

module.exports = {
  entry: {...dllStaticList},	// dll处理的静态资源文件
  mode: "production",
  output: {
    filename: "[name].dll.[hash:6].js",
    path: path.resolve(__dirname, '../public/dll'),
    library: '[name]_[hash]'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../public/dll')]
    }),
    new webpack.DllPlugin({
      context: path.resolve(__dirname), //上下文必填
      name: '[name]_[hash]',
      path: path.resolve(__dirname, '../public/dll', '[name].manifest.json') //manifest.json的生成路径
    })
  ]
};
