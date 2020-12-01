export default [
  {
    path: '/',
    component: '@/Layout/index',
    flatMenu: true,
    routes: [
      { path: '/', component: '@/pages/index' },
      { path: '/login', layout: false, component: '@/pages/login' },
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
