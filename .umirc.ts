import { defineConfig } from 'umi';
const API_PREFIX: string = '/api';
const APP_TITLE: string = 'xxxxxx';

export default defineConfig({
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: false,
    baseSeparator: '-',
  },
  publicPath: './',
  history: { type: 'hash' },
  layout: { name: APP_TITLE, locale: false },
  define: { API_PREFIX, APP_TITLE },
  headScripts: [{ src: './app_config.js' }],
  proxy: {
    '/api': {
      target: 'http://192.168.198.xxx:xxx',
      changeOrigin: true,
      pathRewrite: { [`^${API_PREFIX}`]: '' },
    },
  },
  routes: [{ path: '/signin', component: './signin', layout: false }],
});
