import { IConfig } from 'umi-types';

const packageInfo = require('./package.json');

const DEF_CONFIG = {
  VERSION: packageInfo.version,
  URL: 'api',
  TITLE: 'UMI-Template',
  AUTH_NAME: 'umi_template',
  PROJECT_NAME: 'umi-template',
};

// ref: https://umijs.org/zh/plugin/umi-plugin-react.html
const umiPluginRect = {
  antd: true,
  dva: true,
  routes: {
    exclude: [
      /model\.(t|j)sx?$/,
      /models\//,
      /service\.(t|j)sx?$/,
      /services?\//,
      /components\//,
      /index.d.ts/,
      /x\-([\S]+)?/,
    ],
  },
};

// 目前只支持 207 cdn 只支持 axios lodash moment react react-dom react-router react-redux 加速
// 如需添加需要在 207 cdn 下添加 `${name}.min.js` 文件
const umiPluginReplaceCdn = {
  template: 'http://192.168.198.207/cdn/${name}.min.js',
  externals: [
    { name: 'axios', var: 'window.axios' },
    { name: 'lodash', var: 'window._' },
    { name: 'moment', var: 'window.moment' },
    { name: 'react', var: 'window.React' },
    { name: 'react-dom', var: 'window.ReactDOM' },
    { name: 'react-router', var: 'window.ReactRouter' },
    { name: 'react-redux', var: 'window.ReactRedux' },
  ],
};

// ref: https://umijs.org/config/
const config: IConfig = {
  plugins: [
    ['umi-plugin-react', umiPluginRect],
    // ['umi-plugin-replace-cdn', umiPluginReplaceCdn],
  ],
  hash: true,
  history: 'hash',
  publicPath: './',
  treeShaking: true,
  context: DEF_CONFIG,
  // proxy: {
  //   '/api': {
  //     target: '/',
  //     pathRewrite: { '^/api': '' },
  //   },
  // },
  copy: [{ from: './context.js', to: '/src/publish' }],
};

export default config;
