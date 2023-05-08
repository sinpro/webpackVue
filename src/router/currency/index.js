export default [
  { //首页
    path: '/currency',
    name: 'Currency',
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require('views/currency/index.vue')),
      ),
    meta: {
      // title: '首页',
      // keepAlive: true,
      // roles: ['admin', 'editor']
    }
  },
  { //首页
    path: '/currencyComfirm',
    name: 'Comfirm',
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require('views/currency/comfirm.vue')),
      ),
    meta: {
      // title: '首页',
      // keepAlive: true,
      // roles: ['admin', 'editor']
    }
  },
  { //首页
    path: '/currencyResult',
    name: 'Result',
    component: resolve =>
      require.ensure(
        [],
        () => resolve(require('views/currency/result.vue')),
      ),
    meta: {
      // title: '首页',
      // keepAlive: true,
      // roles: ['admin', 'editor']
    }
  }
]