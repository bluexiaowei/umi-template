// ref: https://umijs.org/config/
// ref: https://umijs.org/plugin/umi-plugin-react.html
const path = require('path');
const { URL, TITLE } = process.env;
const umiPluginReact = {
  antd: true,
  dva: true,
  locale: true,
  title: TITLE,
  routes: { exclude: [/components/, /model/, /services/, /locales/] },
};

export default {
  treeShaking: true,
  context: { URL, TITLE },
  alias: {
    Components: path.resolve(__dirname, 'src/componets/'),
    Utils: path.resolve(__dirname, 'src/utils/'),
    Assets: path.resolve(__dirname, 'src/assets/'),
  },
  publicPath: './',
  plugins: [['umi-plugin-react', umiPluginReact]],
};
