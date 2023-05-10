import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 动态引入./modules里的文件
const files = require.context('./modules', true, /\.js$/);
const modules = files.keys().reduce((modules, filePath) => {
  const fileName = filePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = files(filePath);
  modules[fileName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
  modules
});