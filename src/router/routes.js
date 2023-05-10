import home from './home'; // 首页
import demo from './demo'; 
import currency from './currency'; 
// 不需要动态判断权限
const constantRoutes = [
    {
        path: '/',
        redirect: {
          path: '/home'
        }
      },
      {
        path: '/serverError',
        name: 'serverError',
        component: () => import('src/components/errorPage'),
      },
      {
        path: '*',
        name: '404',
        component: () => import('src/components/errorPage'),
      },
];
// 需求动态判断权限并通过addRoutes 动态添加的页面
const asyncRoutes = [
    ...home,
   
    {
        path: '/layout',
        name: 'layout',
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require('src/components/bankLayout')),
            'BankLayout'
          ),
        children:[
          ...demo,
          ...currency,
        ]
    }
]
const routes = [...constantRoutes, ...asyncRoutes];
export default [...routes];