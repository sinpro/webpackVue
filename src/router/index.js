import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 解决侧边栏重复点击报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
import routes from './routes';
const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes
})
const whitePath = [];
router.beforeEach((to, from, next) => {
    next()
})
router.afterEach((to) => {
  

})
export default router;