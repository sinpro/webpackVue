import Vue from 'vue';
import App from './app.vue';
import i18n from './i18n';
import router from './router';
import store from './store';
import 'lib-flexible';

import './style/index.scss';

const root = document.createElement('div');
document.body.appendChild(root);
new Vue({
	i18n,
	router,
	store,
	render:c=>c(App)
}).$mount(root);