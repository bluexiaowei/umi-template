import { readFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'umi';
import APP_CONFIG from './APP_CONFIG';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';

const content = readFileSync(resolve(__dirname, 'APP_CONFIG.ts'), {
  encoding: 'utf-8',
});

export default defineConfig({
  routes,
  proxy,
  theme,
  hash: true,
  locale: {},
  publicPath: './',
  history: { type: 'hash' },
  scripts: [{ content }],
  layout: {
    name: APP_CONFIG.appTitle,
    locale: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  copy: ['README.md'],
});
