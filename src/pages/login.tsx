import * as userAPI from '@/services/user';
import config from '@/utils/config';
import cookie from '@/utils/cookie';
import storge from '@/utils/storge';
import { Button, Form, Input, message, Divider } from 'antd';
import { history, useModel, useRequest } from 'umi';
import styles from './login.less';

export default () => {
  const [form] = Form.useForm();
  const { refresh } = useModel('@@initialState');
  const { loading, run } = useRequest(userAPI.login, {
    manual: true,
    onSuccess(data) {
      message.success('登录成功');

      storge.set('user', data);
      cookie.set('token', data.token);

      refresh();

      setTimeout(() => {
        if (history.location.query?.redirect) {
          history.replace(history.location.query?.redirect as string);
        } else {
          history.push('/');
        }
      }, 300);
    },
  });

  return (
    <div className={styles.form}>
      <Form size="large" form={form} name="login" onFinish={run}>
        <Divider>{config.appTitle}</Divider>

        <Form.Item name="username">
          <Input />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" loading={loading} htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
