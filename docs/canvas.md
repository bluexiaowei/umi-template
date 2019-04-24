# 画布模块

## 使用

```shell
$ npx umi block add https://gitlab.com/bluexiaowei/umi-template/tree/master/block/canvas
add...
```

## 业务嵌套

1. 修改文件 `project/src/layouts/index.tsx`

  ```tsx
    //...
    export default (props: Props): JSX.Element => {
      const { children, location } = props;
      const { pathname } = location;
      // - const BlankLayouts = ['/blank'];
      const BlanKlayouts = ['/block', '/canvas']

      if (BlankLayouts.some(item => pathname.includes(item))) {
        return <BlankLayout children={children} />;
      } else {
        return <ClassicLayout children={children} />;
      }
    };
  ```