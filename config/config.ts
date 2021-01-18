import { defineConfig } from 'umi';
import '../public/app-config.js';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';

const APP_CONFIG: APP_CONFIG = globalThis?.APP_CONFIG;

export default defineConfig({
  routes,
  proxy,
  theme,
  publicPath: './',
  hash: true,
  locale: {},
  history: { type: 'hash' },
  scripts: [{ src: './app-config.js' }],
  layout: {
    name: APP_CONFIG.appTitle,
    locale: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
});
