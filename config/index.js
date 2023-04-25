let {resolve} = require('path');
let devServer = require('./dev'); // 开发环境配置 项目开发中不提交，每个开发者的习惯可能不一样
// const rootValue = 37.5;
const env=process.argv[process.argv.length-1];
module.exports = {
  assets              : 'assets', // 打包后静态资源子目录
  hashLen             : 8,
  publicPath          : env === 'production' ? './' : '/',
  mockPath            : resolve(__dirname, '../mock'), // 项目源代码目录
  srcPath             : resolve(__dirname, '../src'), // 项目源代码目录
  rootPath            : resolve(__dirname, '../dist'), // production环境打包后静态资源根目录
  fatDistPath         : resolve(__dirname, '../dist/fat-dist'),// 测试环境打包后的路径
  uatDistPath         : resolve(__dirname, '../dist/uat-dist'),// 生产环境打包后的路径
  limit               : 1024 * 5, // url-loader limit参数
  devServer           : devServer,
  bundleAnalyzer      : false,
  // rootValue           : rootValue,
  imagesPublicPath    : '../../',
  postcssLoaderOptions: {
    loader : 'postcss-loader',
    options: {
      plugins: [
        require("autoprefixer")
      ]
    }
  }
};