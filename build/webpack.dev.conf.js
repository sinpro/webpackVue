const vueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const utils = require('./utils');
const baseConfig = require('./webpack.base.conf');
const {srcPath,assets,postcssLoaderOptions,bundleAnalyzer} = require('../config');

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['webpack-hot-middleware/client'].concat(baseConfig.entry[name])
});

// let entrys = utils.getMultiEntry('./src/templates/*.ejs');
let entrys = utils.getMultiEntry('./src/templates/dev.ejs');
let htmlPlugins = {
  plugins: []
};

for (let key in entrys) {
  console.log(`${srcPath}/templates/${entrys[key]}`)
  htmlPlugins.plugins.push(new HtmlWebpackPlugin({
    template: `${srcPath}/templates/${entrys[key]}`,
    // filename: `${key}.html`,
    filename: 'index.html',
    favicon : './src/images/favicon.ico',
    // chunks  : ['manifest', 'vendor', 'common', key],
    chunks  : ['manifest', 'vendor', 'common', 'index'],
    hash    : false,
    minify  : {
      removeComments    : true,
      collapseWhitespace: true
    }
  }));
}

if(bundleAnalyzer){
  htmlPlugins.plugins(new BundleAnalyzerPlugin());
}

process.env.NODE_ENV='development';
process.noDeprecation=true;

module.exports = merge(baseConfig, htmlPlugins, {
  mode: 'development',
  output : {
    filename: `${assets}/js/[name].js`
  },
  module : {
    rules: [{
      test   : /\.scss$/,  // creates style nodes from JS strings | translates CSS into CommonJS | compiles Sass to CSS
      include: srcPath,
      use    : [
        'style-loader',
        'css-loader',
        postcssLoaderOptions,
        'sass-loader',
        {
          loader:'sass-resources-loader',
          options:{
            resources:path.resolve(__dirname,'../src/style/base/mixin.scss')
          }
        }
      ]
    }, {
      test: /\.css$/,
      use : [
        'style-loader',
        'css-loader',
        postcssLoaderOptions,
      ]
    }, {
      test   : /\.vue$/,
      loader : 'vue-loader',
      include: srcPath,
      options: {
        loaders: {
          css: [
            'vue-style-loader',
          ]
        }
      }
    }]
  },
  devtool: '#cheap-module-eval-source-map',   // #eval-source-map
  plugins: [
    new vueLoaderPlugin(),
    // 配置环境变量 --开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
});
