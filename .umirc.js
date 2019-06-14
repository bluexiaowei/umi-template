// ref: https://umijs.org/config/
// ref: https://umijs.org/plugin/umi-plugin-react.html
const path = require('path');
const dirname = __dirname;
const { URL, TITLE } = process.env;
const umiPluginReact = {
  antd: true,
  dva: true,
  title: TITLE,
  local: true,
  routes: {
    exclude: [/components/, /model[s]?/, /service[s]?/, /locales/, /index.d.ts/],
  },
};

export default {
  history: 'hash',
  treeShaking: true,
  context: { URL, TITLE },
  alias: {
    Data: path.resolve(dirname, 'src/data/'),
    Utils: path.resolve(dirname, 'src/utils/'),
    Assets: path.resolve(dirname, 'src/assets/'),
    Components: path.resolve(dirname, 'src/componets/'),
    CommonLess: path.resolve(dirname, 'src/commonLess.less'),
  },
  define: { BASE_URL: URL },
  publicPath: './',
  plugins: [['umi-plugin-react', umiPluginReact]],
};
