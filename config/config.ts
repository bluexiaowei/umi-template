import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
import '../public/app-config.js';

const APP_CONFIG: APP_CONFIG = globalThis?.APP_CONFIG;

export default defineConfig({
  routes,
  proxy,
  publicPath: './',
  scripts: [{ src: './app-config.js' }],
  layout: {
    name: APP_CONFIG.appTitle,
    locale: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
});
