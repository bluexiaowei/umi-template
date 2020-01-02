# 快速开始

> 使用 `npm create` 线上 `create-shurui-cli` 工具，它会拉取该项目文件。

```bash
mkdir projectName
cd projectName
npm create shurui-cli
```

或者

```bash
npm install -g create-shurui-cli
mkdir projectName
cd projectName
create-shurui-cli
```

## 修改内部变量

```js
const DEF_CONFIG = {
  VERSION: packageInfo.version, // 当前项目版本
  URL: 'api', // 前端 API 请求地址前缀
  TITLE: 'UMI-Template', // 前端页面标题
  AUTH_NAME: 'umi_template', // 鉴权项目名，用于判断登录
  PROJECT_NAME: 'umi-template', // 前端项目名称，用于区分本地存储
};
```

## 添加报错码

报错码文件路径 `src/json/codeMes.json`。

```json
[
  { "key": "MW_99999", "label": "系统错误，未知错误" },
  { "key": "MW_01402", "label": "token 过期， 重新登录" }
]
```
