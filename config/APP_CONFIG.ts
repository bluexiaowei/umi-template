export default {
  apiPrefix: '/api/umi-template',
  appTitle: '前端模版工具',
  codename: 'umi-template',
  // 密码至少为 8 位，需同时包含大写或小写字母、数字、特殊字符中的 3 种。
  patternPWD: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/,
  uploadMaxLength: 50,
  uploadSingleSize: 20 * 1024 * 1024,
};
