// ref: https://umijs.org/config/
// ref: https://umijs.org/plugin/umi-plugin-react.html
const { URL } = process.env;

const umiPluginReact = {
  antd: true,
  dva: true,
  dynamicImport: false,
  title: 'base-modules',
  dll: false,
  routes: { exclude: [/components\//] },
};

export default {
  treeShaking: true,
  context: { URL, TITLE: umiPluginReact.title },
  alias: {
    Components: 'src/componets/',
    Utils: 'src/utils/',
    Static: 'src/static/',
  },
  publicPath: './',
  plugins: [['umi-plugin-react', umiPluginReact]],
};
