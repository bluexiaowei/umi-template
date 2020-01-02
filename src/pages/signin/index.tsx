import { Button, Divider, Form, Input, message } from 'antd';
import { connect } from 'dva';
import context from '@/utils/context';
import React, { useCallback } from 'react';
import * as TS from './index.d';

const styles = require('./index.less');
const { Item: FormItem } = Form;

const Signin = (props: TS.Props) => {
  const { form, loading, history } = props;
  const { getFieldDecorator, validateFields } = form;

  const submitForm = useCallback(() => {
    validateFields((err, values) => {
      if (err) return;

      props
        .dispatch({ type: 'user/signin', payload: values })
        .then(() => {
          history.push('/');
        })
        .catch(message.error);
    });
  }, []);

  return (
    <div className={styles.loginContain}>
      <Form className={styles.loginForm} autoComplete="off">
        <Divider>{context.TITLE}</Divider>

        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(<Input placeholder="用户名" />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(<Input type="password" placeholder="密码" onPressEnter={submitForm} />)}
        </FormItem>

        <FormItem>
          <Button
            block
            type="primary"
            loading={loading.effects['user/signin']}
            onClick={submitForm}
          >
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

const FormSignin = Form.create()(Signin);

export default connect(({ user, loading }: any) => ({ ...user, loading }))(FormSignin);
