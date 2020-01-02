# 常见问题

## 如何是不删除页面文件的时它不生效

> 在你的页面路由下面添加前缀 `x-` 让 `.umirc.ts` 识别到文件夹前缀，而忽略它。

```typescript
const umiPluginRect = {
  antd: true,
  dva: true,
  routes: {
    exclude: [
      /model\.(t|j)sx?$/,
      /models\//,
      /service\.(t|j)sx?$/,
      /services?\//,
      /components\//,
      /index.d.ts/,
      /x\-([\S]+)?/, // <- 对，就是它
    ],
  },
};
```
