# umi 模板项目

## 前言

由于新建立的一个项目，需要手动添加和配置，显得十分麻烦。

该项目是将以前成型的配置，快速应用到新项目中。

需配合 create-shurui-cli 工具对本项目代码文件的下载。

## 内容

### 区块

> 在 umi 中，区块是指页面级别的可复用的代码。umi 定义了一个区块的规范，你可以通过 umi 能够快速简单的在你的项目中添加区块，用于快速的开始一个页面的开发。

#### umi help block

```bash
# Add block
umi block add demo
umi block add ant-design-pro/Monitor

# Add block with full url
umi block add https://github.com/umijs/umi-blocks/tree/master/demo

# Add block with specified route path
umi block add demo --path /foo/bar

# List all blocks
umi list
```

#### signin 登录模块

```bash
npx umi block add https://gitlab.com/bluexiaowei/umi-template/tree/master/block/signin
```

#### TO DO for Block

- [x] Signin
- [x] Canvas
- [ ] Registered
- [ ] Settings

## 总结

### 相关资料

- [UmiJS](https://umijs.org)
- [create-shurui-cli](https://gitlab.com/shuruitech/omega-infrastructure/frontend/create-shurui-cli)
