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
    Data: path.resolve(dirname, 'src/data/'),
    Utils: path.resolve(dirname, 'src/utils/'),
    Assets: path.resolve(dirname, 'src/assets/'),
    Components: path.resolve(dirname, 'src/componets/'),
    CommonLess: path.resolve(dirname, 'src/commonLess.less'),
  },
  publicPath: './',
  plugins: [['umi-plugin-react', umiPluginReact]],
};
