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

// ref: https://umijs.org/config/
const config: IConfig = {
  plugins: [['umi-plugin-react', umiPluginRect]],
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
};

export default config;
