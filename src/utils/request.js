import Vue from 'vue';
import axios from 'axios';
import MyPromise from 'promise';// 兼容ie10，promise resolve之后 then不执行的问题


const isDev = process.env.NODE_ENV;
let ajaxCounter = 0;
let noRepeatLoading = false;
// 获取vue链
const $$context = Vue.prototype;

/**
 * 处理生产环境和开发环境接口请求地址
 * @param config
 * @returns {any}
 */
function handlePreUrl(config = {}) {
  const {
    url = '',  // 接口地址
    devPreUrl = config.devPreUrl ? (config.devPreUrl == '/api' ? ENV_CONFIG.base_url : config.devPreUrl) : '', // 开发环境url前缀地址
    demoPreUrl = '',
    prodPreUrl = '', // 生产环境url前缀地址
    prodServer = ENV_CONFIG.base_url, // 生产的服务地址
    data = "", //请求参数
  } = config;
  let fixUrl = url; // 拼接的url
  const prodServerReg = new RegExp(prodServer); // 生产接口地址正则
  const routeInfo = store.getters.getRouteInfo; // 获取路由信息
  if (config.url !== '/upload' && config.url !== '/intranetUpload') {
    config.data = {
      header: {
        channelNo: 'CB',
        verison: appInfo.version,
      },
      body: { ...data}
    }

  } else {
    config.data = data;
  }
  // dev环境
  if (isDev === 'development') {
    // fixUrl = `${devPreUrl}${url}`;
    fixUrl = `${demoPreUrl}${url}`;
  } else if (isDev === 'demo') {
    fixUrl = `${demoPreUrl}${url}`;
  } else if (!(prodServerReg.test(prodPreUrl) || prodServerReg.test(url))) {
    // 生产环境或配置的地址以配置的接口地址开始
    fixUrl = `${prodServer}${prodPreUrl}${url}`;
  }
  return Object.assign(config, { url: fixUrl });
}
let LogintimeStatus = true;
const ajax = axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    "Accept": "application/json",
    'Content-Type': 'application/json',
    'X-origin': ''
  },
});

ajax.interceptors.request.use(
  (config) => {
    if (!config['noLoading']) {
      ajaxCounter++;
      store.commit('setLoading', true);
    }
    // 请求头设置token
    // config.headers.iCIFID = store.state.app.token ? store.state.app.token : '';
    // 允许get请求下，可设置请求头
    if (config.method === 'get') {
      config.data = true;
    }
    return handlePreUrl(config);
  },
  (err) => {
    ajaxCounter = 0;
    store.commit('setLoading', false);
    return new MyPromise((resolve, reject) => reject(err));
  }
);

ajax.interceptors.response.use(
  (response) => {
    if (!response.config['noLoading'] && ajaxCounter > 0) {
      ajaxCounter--;
    }
    if (ajaxCounter <= 0) {
      ajaxCounter = 0;
      store.commit('setLoading', false);
    }

    // 重映射返回信息
    if (response.data.header) {
      response.data.header.errorMessage = response.data.header.errorMsg;
    }
    let result = response.data;
   

    if (response.config.responseType === 'blob') {
      result = {
        headers: response.headers,
        data: response.data,
      };
    }
    return new MyPromise((resolve) => resolve(result));
  },
  (err) => {
    alert('系统错误，请稍后重试');
    ajaxCounter = 0;
    store.commit('setLoading', false);
    console.log('network error', err.msg);
    return new MyPromise((resolve, reject) => reject(err));
  }
);

export default ajax;
