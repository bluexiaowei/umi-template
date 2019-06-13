import { IConfig } from 'umi-types';
const path = require('path');
const baseModulesPath = path.resolve(__dirname, '../../src/');
const umiPluginReact = {
  antd: true,
  dva: true,
  locale: true,
  routes: { exclude: [/components/, /model/, /services/] },
};
const umiPluginBlockDev = {};
const config: IConfig = {
  alias: {
    Components: path.resolve(baseModulesPath, 'componets'),
    Utils: path.resolve(baseModulesPath, 'utils'),
    Assets: path.resolve(baseModulesPath, 'assets'),
  },
  plugins: [['umi-plugin-react', umiPluginReact], ['umi-plugin-block-dev', umiPluginBlockDev]],
};

export default config;
