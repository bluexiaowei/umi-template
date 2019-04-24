# umi 模板项目

## 前言

由于新建立的一个项目，需要手动添加和配置，显得十分麻烦。

该项目是将以前成型的配置，快速应用到新项目中。

需配合 create-shurui-cli 工具对本项目代码文件的下载。

## 开始

1. 使用 CLI 工具生成空项目。
  
   ```shell
   $ mkdir projectName && cd projectName
   $ npm create shurui-cli
   create...
   ```

2. 安装项目依赖

  ```shell
  $ yarn install
  # or
  $ npm install
  ```

## 区块

### 区块介绍

> 在 umi 中，区块是指页面级别的可复用的代码。umi 定义了一个区块的规范，你可以通过 umi 能够快速简单的在你的项目中添加区块，用于快速的开始一个页面的开发。

### 数睿仓库

- [x] [signin](/signin.md)
- [x] canvas
- [ ] registered
- [ ] settings

### 区块使用

```shell
$ npx umi block add https://gitlab.com/bluexiaowei/umi-template/tree/master/block/<name>
# npx umi block add https://gitlab.com/bluexiaowei/umi-template/tree/master/block/signin
```

## 相关资料

- [umi](https://umijs.org)
- [umi block](https://umijs.org/zh/guide/block.html)
- [create-shurui-cli 项目](https://gitlab.com/shuruitech/omega-infrastructure/frontend/create-shurui-cli)
- [create-shurui-cli npm](https://www.npmjs.com/package/create-shurui-cli)
