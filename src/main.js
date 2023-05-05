import Vue from 'vue';
import App from './app.vue';
import i18n from './i18n';
import router from './router';
import store from './store';

import 'lib-flexible';

import './style/index.scss';

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI,{zIndex:30000});
// 获取mac地址
for(let i in osMac){
	for(let j in osMac[i]){
		if(osMac[i][j]['family']==="IPv4"&&osMac[i][j]['mac']!=="00:00:00:00:00:00"&& osMac[i][j]["address"]!=="127.0.0.1"){
			Vue.prototype.$macIP=osMac[i][j]['mac']
		}
	}
}
console.log(osMac,Vue.prototype.$macIP,'mac')

const root = document.createElement('div');
document.body.appendChild(root);
new Vue({
	i18n,
	router,
	store,
	render:c=>c(App)
}).$mount(root);