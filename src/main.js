import Vue from 'vue';
import App from './app.vue';
import i18n from './i18n';
import router from './router';
import store from './store';

import 'lib-flexible';

import './style/index.scss';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
// 获取mac地址
for(let i in osMac){
	for(let j in osMac[i]){
		if(osMac[i][j]['family']==="IPv4"&&osMac[i][j]['mac']!=="00:00:00:00:00:00"&& osMac[i][j]["address"]!=="127.0.0.1"){
			Vue.prototype.$macIP=osMac[i][j]['mac']
		}
	}
}
console.log(osMac,Vue.prototype.$macIP,'mac')




// var npm = require('getmac');//获取mac地址
  
//  //获取机器mac地址
//  npm.getMac(function(err,macAddress){
//      if (err)  throw err;
//      var mac = macAddress; //获取mac地址
//      console.log(mac,'macmac');     
//  });

const root = document.createElement('div');
document.body.appendChild(root);
new Vue({
	i18n,
	router,
	store,
	render:c=>c(App)
}).$mount(root);