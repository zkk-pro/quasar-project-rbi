const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'mining', component: () => import('pages/Mining') },
      {
        path: 'lock-position',
        meta: { title: 'routes_lock' },
        component: () => import('pages/LockPosition')
      },
      {
        path: 'success',
        name: 'success',
        component: () => import('pages/Success')
      },
      {
        path: 'mining-order',
        meta: { title: 'routes_min_order' },
        component: () => import('pages/MiningOrder'),
        children: [
          {
            path: '',
            component: () => import('pages/OrderList')
          },
          {
            path: 'order-detail',
            meta: { title: 'routes_min_orderdetail' },
            component: () => import('pages/OrderDetail')
          }
        ]
      },
      { path: 'assets', component: () => import('pages/UserAssets') },
      {
        path: 'earning-detail',
        component: () => import('pages/EarningDetail')
      },
      { path: 'message-list', component: () => import('pages/MessageList') },
      {
        path: 'message-detail',
        component: () => import('pages/MessageDetail')
      },
      { path: 'login', component: () => import('pages/Login') },
      { path: 'registry', component: () => import('pages/Registry') },
      { path: 'user-info', component: () => import('pages/UserInfo') },
      {
        path: 'f-g-validator',
        component: () => import('pages/GoogleValidatorFirst')
      },
      { path: 'g-validator', component: () => import('pages/GoogleValidator') },
      { path: 'modify-pwd', component: () => import('pages/ModifyPwd') },
      { path: 'modify-pin', component: () => import('pages/ModifyPIN') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
