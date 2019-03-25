// ref: https://umijs.org/config/
// ref: https://umijs.org/plugin/umi-plugin-react.html

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
  plugins: [['umi-plugin-react', umiPluginReact]],
};
