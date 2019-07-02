// ref: https://umijs.org/config/
// ref: https://umijs.org/plugin/umi-plugin-react.html
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
  define: { BASE_URL: URL },
  publicPath: './',
  plugins: [['umi-plugin-react', umiPluginReact]],
};
