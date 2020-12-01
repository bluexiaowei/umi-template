import { Form, Input, Button, Divider } from 'antd';
import styles from './login.less';
import config from '@/utils/config';

export default () => {
  const [form] = Form.useForm();

  return (
    <div className={styles.form}>
      <Form form={form} name="login">
        <Divider>{config.appTitle}</Divider>

        <Form.Item name="username">
          <Input />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button block type="primary">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
