# Umi Template

| Name | URL  |
| :--- | :--- |
| PRD  |      |

## User
| RUL  | Username | Password |
| :--- | :------- | :------- |
|      |          |          |

## Version

## FAQ

### 1. 如何更换 API 地址

```js
// app-cofnig.js

{
    //...
    // 请求将拼接成当前页面地址 http://xx.xx.xx.xx:xx/XXX
    apiPrefix: 'XXX'
    //...
}

{
    //...
    // 请求将被替换 https://xx.xx.xx:xx/XX
    apiPrefix: 'https://xx.xx.xx.xx:xx/XX'
    //...
}

```
