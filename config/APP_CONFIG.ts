export default {
  // API 请求前缀
  apiPrefix: '/api/umi-template',
  // 应用名称
  appTitle: '前端模版工具',
  // 项目代号
  codename: 'umi-template',
  // 密码至少为 8 位，需同时包含大写或小写字母、数字、特殊字符中的 3 种。
  patternPWD: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/,
  // 最大上传文件数（单位：张）
  uploadMaxLength: 50,
  // 单个文件大小上线（单位：B）
  uploadSingleSize: 20 * 1024 * 1024,
};
