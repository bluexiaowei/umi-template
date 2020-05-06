import * as API from '@/services/user';
import { useRequest } from '@umijs/hooks';
import { Button, Divider, Form, Input } from 'antd';
import Cookies from 'js-cookie';
import React from 'react';
import { history, useModel } from 'umi';

interface User {
  id: string;
  username: string;
  token: string;
}

function SigninPage() {
  const { refresh } = useModel('@@initialState');
  const { loading, run } = useRequest(API.signin, {
    manual: true,
    onSuccess: (user: User) => {
      console.log(user);
      // 存储 用户信息
      Cookies.set('token', user.token, { expires: 0.5 });
      Cookies.set('user', JSON.stringify(user), { expires: 0.5 });

      // 登录成功跳转页面
      refresh();
      history.replace('/');
    },
  });

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flex: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(204deg, #30e3ca 0%, #11999e 73%)',
      }}
    >
      <Form
        name="basic"
        onFinish={run}
        autoComplete="off"
        wrapperCol={{ span: 24 }}
        style={{
          padding: '0 20px',
          width: '320px',
          justifyItems: 'center',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '2px',
          backgroundColor: '#fff',
          boxShadow: '10px 10px 10px #000',
        }}
      >
        <Divider>{APP_TITLE}</Divider>

        <Form.Item
          name="account"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} block type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

SigninPage.title = 'Signin';

export default SigninPage;
