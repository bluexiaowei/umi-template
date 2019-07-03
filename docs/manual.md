# 开发指导

## 前言

由于项目众多希望建立一些指导或者是规范，使代码规范并可移植。

本文以 `Typescript` 为讲解，这只是可选项。

## 创建模板

1. 使用 `create-shurui-cli`。 创建前端统一的前段模板路径。
2. 尝试性使用 `Typescript` 来对项目巩固代码的稳定性。

## 目录规范

根据 `umi` 的路由约定，使得目录结构清晰，代码分块。

有多个兄弟路由的时候使用 `user/index/index.tsx` 替代 `user/index.tsx`。

多路由

```
. @/pages/user
├── details
│   ├── index.less
│   ├── index.tsx
│   ├── model.ts
│   └── server.ts
├── index
│   ├── index.less
│   ├── index.tsx
│   ├── model.ts
│   └── server.ts
└── index.tsx
```

多路由 `index.tsx` 重定向。

```tsx
// @/pages/user/index.tsx
import { Redirect } from 'umi';

// 重定向路由到 /#/user => /#/user/index
export default () => <Redirect to="/user/index"/>;
```

单路由

```
. @/pages/user  
├── index.less
├── index.tsx 
├── model.ts
└── server.ts
```




## 文件规范

以单路由文件为例子 `@/pages/user`

### server

一般模块都有请求文件。

将数据转换的逻辑写在请求文件里面，这样 `model.ts` 文件组要处理状态的更新与转换，侧面减少文件大小。


```typescript
// @/pages/user/server.ts
import request from '@/utils/request';
import format from '@/utils/format';

// GET 获取用户列表
export function getUsers(params){
  const sendData = format(params, [
    { name: 'current', type: 'number' },
    { name: 'pageSize', type: 'number' }
  ]);

  return request.get('/users', sendData, { transformResponse: [transformResponse] });

  // 格式化返回的数据 [可有可无]
  function transformResponse(result: string) {
    // 反序列化
    result = JSON.parse(result);
    return format(result, [
      { name: 'success' },
      { name: 'message' },
      {
        name: 'data',
        children: [
          { name: 'id' },
          { name: 'name' },
          { name: 'age' },
          { name: 'gender' }
        ],
      },
    ]);
  })
}

// POST/PUT 创建用户信息或者更新用户信息
export function updateUser(params) {
  const sendData = format(params, [
    {name: 'id', type: 'number'},
    {name: 'name'},
    {name: 'age', type: 'number'},
    {name: 'gender', type: 'number'}
  ]);

  return request[sendData.id ? 'put' : 'post']('/users', sendData);
}
```

### index.d.ts

`typescript` 接口声明文件。

```typescript
// @/pages/user/index.d.ts
import { ConnectProps } from 'typings';

export interface Props extends ConnectProps {
  filters: {
    total: number;
    current: number;
    pageSzie: number;
  };
  users: any[];
}
```

### model

```typescript
// @/pages/user/model.ts
import * as IndexD from './index.d';
import * as api from './server';
import { Model } from 'dva';

const defState: IndexD.Props = {
  filters: {
    total: 0,
    current: 1,
    pageSize: 10
  },
  users: [];
};

const model: Model = {
  namespace: 'user',

  state: defState,

  effects: {
    *getUsers({ payload }, { call }) {
      const result = yield call(api.getUsers, payload);

      if (result.success) {
        return result.data;
      } else {
        throw result.message;
      }
    }
  },

  reducers: {
    RESET(state, { payload }) {
      return { ...defState, ...payload };
    },
    STATE(state, { payload }) {
      return { ...state, ...payload };
    }
    FILTERS(state, { payload, inherit }) {
      const { filters } = inherit ? state : defState;

      return { ...state, filters: { ...filters, ...payload }};
    }
  },
}
```

### index

路由或组件文件。

统一使用 `class` 类来声明 `React` 组件 (个人认为可以舍弃一点性能，使得文件格式统一，这样有利于伙伴之间的代码审核)。

如果一个文件中只有一个 `class` 请使用 `Index` 作为组件名称。文件名其实已经是你的组件名称。或者使用 'displayName' 用于调试时显示。

```tsx
// @page/user/index.tsx
import * as React from 'react';
import * as IndexD from './index.d';
import { connect } from 'dva';
import { Table } from 'antd';

@connect({ user, loading }) => ({ ...user, loading })
class Index extends React.Component<IndexD.Props> {
  displayName: 'userPage';

  render(){
    const {  users } = this.props;

    return (
      <Table
        columns={this.createColumns()}
        dataSource={users}
        pagination={this.createPagination(this.props.filters)}
      />
    );
  }

  createColumns = () => {
    return [
      { title: '名称', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'gender' },
    ];
  };

  createPagination = (filters) => {
    return {
      total: filters.total,
      current: filters.current,
      pageSize: filters.pageSize,
    };
  }
}

export default Index;
```