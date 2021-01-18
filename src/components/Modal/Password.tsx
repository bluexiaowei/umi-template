import * as userAPI from '@/services/user';
import config from '@/utils/config';
import { useRequest } from 'ahooks';
import { Form, Input, Modal } from 'antd';
import { useModel } from 'umi';

export default () => {
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { visible, setFalse, logout } = useModel('modal_password');
  const { run, loading } = useRequest(userAPI.putPwd, {
    manual: true,
    onSuccess: logout,
  });

  return (
    <Modal
      title="修改密码"
      visible={visible}
      onOk={form.submit}
      onCancel={setFalse}
      confirmLoading={loading}
    >
      <Form
        form={form}
        onFinish={run}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        autoComplete="off"
        initialValues={{ username: initialState?.username }}
      >
        <Form.Item
          label="当前密码"
          name="old_password"
          rules={[{ required: true, whitespace: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="new_password"
          dependencies={['old_password']}
          rules={[
            { required: true, whitespace: true, message: '请输入密码' },
            {
              pattern: config.PatternPWD,
              message:
                '密码至少为 8 位，需同时包含大写或小写字母、数字、特殊字符中的 3 种。',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('old_password') !== value) {
                  return Promise.resolve();
                }

                return Promise.reject('旧密码不能与新密码一直');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="password"
          dependencies={['new_password']}
          rules={[
            { required: true, whitespace: true, message: '请输入密码' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('请与新密码保持一致');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {['username'].map((item) => (
          <Form.Item noStyle name={item} key={item}>
            <Input type="hidden" />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};
