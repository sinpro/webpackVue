export default [
    { //首页
      path: '/home',
      name: 'Home',
      component: resolve =>
        require.ensure(
          [],
          () => resolve(require('views/home/index.vue')),
        ),
      meta: {
        title: '首页',
        keepAlive: true,
        roles: ['admin', 'editor']
      }
    }
]