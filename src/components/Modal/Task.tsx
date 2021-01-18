import * as taskAPI from '@/services/task';
import config from '@/utils/config';
import { UploadOutlined } from '@ant-design/icons';
import { usePersistFn } from 'ahooks';
import { Button, Form, Input, Modal, Upload } from 'antd';
import set from 'lodash/set';
import { useEffect } from 'react';
import { useModel, useRequest } from 'umi';

export default (props: { onSuccess: () => void }) => {
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { visible, setFalse } = useModel('modal_task');
  const { run, loading } = useRequest(taskAPI.addTask, {
    manual: true,
    onSuccess: () => {
      setFalse();

      props.onSuccess();
    },
  });

  const normFile = usePersistFn((e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return (
      e &&
      e.fileList.map((item: any) => {
        if (item?.originFileObj?.status === 'error') {
          item.status = item.originFileObj.status;
          item.response = item.originFileObj.response;
        }
        return item;
      })
    );
  });

  useEffect(() => {
    if (visible === false) return;

    form.resetFields();
  }, [visible]);

  return (
    <Modal
      title="创建任务"
      visible={visible}
      onOk={form.submit}
      onCancel={setFalse}
      confirmLoading={loading}
      bodyStyle={{ minHeight: 300, maxHeight: '70vh', overflow: 'auto' }}
    >
      <Form
        form={form}
        onFinish={run}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item
          label="任务名"
          name="name"
          rules={[
            { required: true, whitespace: true, message: '请输入任务名' },
            { max: 20, message: '长度超出系统限制，20 个字符。' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          validateFirst
          name="images"
          label="选择文件"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="支持扩展名：.jpg .jpeg .png .tif .bmp .pdf"
          rules={[
            { required: true, message: '请选择文件' },
            {
              max: 50,
              type: 'array',
              message: '单个任务一次最多上传 50 份文件',
            },
          ]}
        >
          <Upload
            multiple
            listType="text"
            accept=".jpg,.jpeg,.png,.tif,.bmp,.pdf"
            action={config.apiPrefix + '/upload/image'}
            headers={{ 'x-user-token': initialState?.token }}
            data={(file) => ({
              file_name: file.name,
              file_type: file.type.split('/')[1],
            })}
            beforeUpload={(file, files) => {
              // 限制单个文件大小
              if (file.size > window.APP_CONFIG.uploadSingleSize) {
                const message = `上传失败：文件超过 ${
                  window.APP_CONFIG.uploadSingleSize / 1024 / 1024
                } Mb`;

                set(file, 'status', 'error');
                set(file, 'response', message);
                return false;
              }

              const originLength = (form.getFieldValue('images') || []).length;

              const fileIndex =
                originLength + files.findIndex((item) => item.uid === file.uid);

              if (window.APP_CONFIG.uploadMaxLength - 1 < fileIndex) {
                const message = `上传失败：仅保留前 ${window.APP_CONFIG.uploadMaxLength} 份文件上传`;

                set(file, 'status', 'error');
                set(file, 'response', message);
                return false;
              }

              return true;
            }}
          >
            <Button icon={<UploadOutlined />}>上传</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
