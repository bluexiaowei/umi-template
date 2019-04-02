const path = require('path');
const baseModulesPath = path.resolve(__dirname, '../../src/');
const umiPluginReact = {
  antd: true,
  dva: true,
  locale: true,
  routes: { exclude: [/components/, /model/, /services/] },
};

const umiPluginBlockDev = {};

export default {
  alias: {
    Components: path.resolve(baseModulesPath, 'componets'),
    Utils: path.resolve(baseModulesPath, 'utils'),
    Static: path.resolve(baseModulesPath, 'Static'),
  },
  plugins: [['umi-plugin-react', umiPluginReact], ['umi-plugin-block-dev', umiPluginBlockDev]],
};
