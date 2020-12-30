import { useRequest } from 'ahooks';
import { Form, Input, Modal } from 'antd';
import { useModel, history } from 'umi';
import * as userAPI from '@/services/user';

export default () => {
  const [form] = Form.useForm();
  const { visible, setFalse } = useModel('modal_password');
  const { run, loading } = useRequest(userAPI.putPWD, {
    manual: true,
    onSuccess: () => {
      setFalse();

      history.push({
        pathname: '/login',
        query: { form: history.location.pathname },
      });
    },
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
          rules={[
            { required: true, whitespace: true, message: '请输入密码' },
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
          rules={[
            { required: true, whitespace: true, message: '请输入密码' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('请与新密码保持一直');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};
