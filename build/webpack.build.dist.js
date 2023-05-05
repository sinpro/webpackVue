/* eslint-disable */
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const utils = require('./utils');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const InsertHtmlSiteConfigPlugin = require('./webpack.config.plugin');
const envConfig = require('../config/envConfig');
const {
  assets,
  srcPath,
  hashLen,
  postcssLoaderOptions,
  imagesPublicPath,
  publicPath,
  dllStaticList
} = require('../config');
const NODE_ENV = process.env.NODE_ENV;	// node环境配置   production|development|...
const NODE_MODE = process.env.NODE_MODE;	// node打包环境配置 dev|fat|uat|prod|...
let bundleAnalyzerPlugin = {
  plugins: process.env.NODE_TYPE === 'watch' ? [new BundleAnalyzerPlugin()]: []
};
// dll方式处理的资源
const dllStaticPlugins = {
  plugins: []
};
for(let dll in dllStaticList){
  dllStaticPlugins.plugins.push(new webpack.DllReferencePlugin({
    context: path.resolve(__dirname),
    manifest: path.resolve(__dirname, '../public/dll', `${dll}.manifest.json`)
  }))
}
const webpackConfig = merge(baseConfig, bundleAnalyzerPlugin, dllStaticPlugins, {
  mode: NODE_ENV,
  output : {
    path      : NODE_MODE!=='prod'?path.resolve(__dirname, `../dist/dist-${NODE_MODE}`):path.resolve(__dirname, `../dist`),
    publicPath: publicPath,
    filename  : `${assets}/js/[name]_[contentHash:${hashLen}].js`
  },
  module: {
    rules: [{
      test: /\.scss$/,
      include: srcPath,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: imagesPublicPath
          }
        },
        'css-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: path.resolve(__dirname, '../src/style/base/mixin.scss')
          }
        }
      ]
    }, {
      test: /\.css$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: imagesPublicPath
          }
        },
        'css-loader',
        postcssLoaderOptions
      ]
    }, {
      test: /\.vue$/,
      include: srcPath,
      use: [
        'thread-loader',
        'cache-loader',{
          loader: 'vue-loader',
          options: {
            loaders: {
              css: [{
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: imagesPublicPath
                  }
                },
                'css-loader?sourceMap',
                'sass-loader',
                postcssLoaderOptions
              ]
            }
          }
        }
      ]
    }]
  },
  optimization: {
    minimize: true,
    minimizer: [
      // js mini
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
        uglifyOptions: {
          compress: {
            drop_debugger: false, // 移除debugger
            drop_console: false //  // 移除console
          }
        }
      }),
      // css mini
      new OptimizeCSSPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        elementui: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]@el[\\/]/,
          name: "elementui",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100,
        },
        vendor: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: -5,
        },
        common: {
          chunks: "all",
          test: /[\\/]src[\\/]views[\\/]/, // eg: /[\\/]src[\\/]js[\\/].*\.vue/,
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1
        },
        mock: {
          chunks: "all",
          test: /[\\/]mock[\\/]/, // eg: /[\\/]src[\\/]js[\\/].*\.vue/,
          name: "mock",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    // html生成插件
    new HtmlWebpackPlugin({
      template: `${srcPath}/templates/index.ejs`,
      filename: 'index.html',
      favicon: './src/images/favicon.ico',
      chunks: ['manifest', 'vendor', 'common', 'mock', 'elementui', 'index'],
      chunksSortMode: 'manual',
      hash: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../public/dll/*.dll.*.js'),
      outputPath: 'assets/dll',//文件输出地址
      publicPath: './assets/dll'
    }),
    // 自定义html插件处理系统常量配置
    new InsertHtmlSiteConfigPlugin({
      nodeMode: NODE_MODE,  // 当前的环境
      variableKey: 'ENV_CONFIG',
      variableValue: envConfig[`${NODE_MODE}`]||{}
    }),
    // 清理删除上一次打包文件
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: NODE_MODE!=='prod'?[path.resolve(__dirname, `../dist/dist-${NODE_MODE}`)]:[path.resolve(__dirname, `../dist`)]
    }),
    // 复制静态资源到对应目录
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public/assets/'),
        to: 'assets',
        ignore: ['.*']
      }
    ]),
    new vueLoaderPlugin(),
    // 配置node环境变量或mock环境
    new webpack.DefinePlugin({
      'isMockEnv': NODE_MODE === 'demo',
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'osMac': JSON.stringify(require('os').networkInterfaces()),
    }),
    new MiniCssExtractPlugin({
      filename: `${assets}/css/[name]_[contentHash:${hashLen}].css`,
      chunkFilename: `${assets}/css/[name]_[contentHash:${hashLen}].css`,
    }),
    // 能使体积更小
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  performance: {
    hints: false
  },
  // devtool: '#cheap-module-eval-source-map',   // #eval-source-map
  devtool: false,   // #eval-source-map
  stats: 'errors-only'
});
module.exports = webpackConfig;