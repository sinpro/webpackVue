export default [
    { //首页
      path: '/demo',
      name: 'Demo',
      component: resolve =>
        require.ensure(
          [],
          () => resolve(require('views/demo/index.vue')),
        ),
      meta: {
        // title: '首页',
        // keepAlive: true,
        // roles: ['admin', 'editor']
      }
    },
    { //首页
      path: '/detail',
      name: 'Detail',
      component: resolve =>
        require.ensure(
          [],
          () => resolve(require('views/demo/detail.vue')),
        ),
      meta: {
        // title: '首页',
        // keepAlive: true,
        // roles: ['admin', 'editor']
      }
    },
    { //首页
      path: '/result',
      name: 'Result',
      component: resolve =>
        require.ensure(
          [],
          () => resolve(require('views/demo/result.vue')),
        ),
      meta: {
        // title: '首页',
        // keepAlive: true,
        // roles: ['admin', 'editor']
      }
    }
]