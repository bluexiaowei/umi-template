const path = require('path');
const baseModulesPath = path.resolve(__dirname, '../../src/');
const currentPath = path.resolve(__dirname, './src');
const umiPluginReact = {
  antd: true,
  dva: true,
  locale: true,
  routes: { exclude: [/components/, /model/, /services/] },
};

const umiPluginBlockDev = {};
export default {
  alias: {
    Utils: path.resolve(baseModulesPath, 'utils'),
    Components: path.resolve(baseModulesPath, 'components'),
    Static: path.resolve(baseModulesPath, 'Static'),
    utils: path.resolve(currentPath, 'components/utils'),
    components: path.resolve(currentPath, 'components'),
  },
  plugins: [['umi-plugin-react', umiPluginReact], ['umi-plugin-block-dev', umiPluginBlockDev]],
};
