import { defineConfig } from 'umi';
import APP_CONFIG from './APP_CONFIG';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';

export default defineConfig({
  routes,
  proxy,
  theme,
  hash: true,
  locale: {},
  publicPath: './',
  history: { type: 'hash' },
  scripts: [{ src: './app-config.js' }],
  layout: {
    name: APP_CONFIG.appTitle,
    locale: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  copy: ['README.md'],
  plugins: ['./plugins/umi-plugins-addFile'],
});
