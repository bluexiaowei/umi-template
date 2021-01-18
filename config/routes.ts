export default [
  { path: '/login', layout: false, component: '@/pages/login' },
  {
    path: '/',
    component: '@/Layout/index',
    flatMenu: true,
    wrappers: ['@/wrappers/auth'],
    routes: [
      { path: '/', component: '@/pages/index' },
      {
        path: '/setting',
        component: '@/pages/setting',
        menu: {
          name: '设置',
          icon: 'setting',
        },
      },
      {
        path: '/admin',
        component: '@/pages/admin',
        access: 'admin',
        menu: {
          name: '管理员',
          icon: 'user',
        },
      },
    ],
  },
];
