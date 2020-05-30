const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'mining', component: () => import('pages/Mining') },
      {
        path: 'lock-position',
        meta: { title: '锁仓' },
        component: () => import('pages/LockPosition')
      },
      {
        path: 'success',
        name: 'success',
        component: () => import('pages/Success')
      },
      {
        path: 'mining-order',
        meta: { title: '挖矿订单' },
        component: () => import('pages/MiningOrder'),
        children: [
          {
            path: '',
            component: () => import('pages/OrderList')
          },
          {
            path: 'order-detail',
            meta: { title: '订单详情' },
            component: () => import('pages/OrderDetail')
          }
        ]
      },
      { path: 'assets', component: () => import('pages/UserAssets') },
      {
        path: 'message',
        meta: { title: '公告列表' },
        component: () => import('pages/Message'),
        children: [
          {
            path: '/',
            meta: { title: '订单详情' },
            component: () => import('pages/MessageList')
          },
          {
            path: 'message-detail',
            meta: { title: '订单详情' },
            component: () => import('pages/MessageDetail')
          }
        ]
      }
      // ,
      // {
      //   path: '/message-detail',
      //   meta: { title: '公告詳情' },
      //   component: () => import('pages/MessageDetail')
      // }
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
