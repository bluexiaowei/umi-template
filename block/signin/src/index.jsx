import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { formatMessage } from 'umi/locale';
import { Row, Col, Form, Input, Button, Divider, message, Alert } from 'antd';

import styles from './index.less';

const { Item: FormItem } = Form;

@connect(({ signin, loading }) => ({ ...signin, loading }))
@Form.create()
class Signin extends React.PureComponent {
  render() {
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.loginContain}>
        <Form className={styles.loginForm} autoComplete="off">
          <Divider>Test Title</Divider>

          <Alert type="success" message="admin/admin" style={{ marginBottom: 10 }} />

          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: formatMessage({ id: 'FORM_ACCOUNT_HINT' }) }],
            })(<Input placeholder={formatMessage({ id: 'ACCOUNT' })} />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: formatMessage({ id: 'FORM_PASSWORD_HINT' }) }],
            })(
              <Input
                type="password"
                placeholder={formatMessage({ id: 'PASSWORD' })}
                onPressEnter={this.submitForm}
              />,
            )}
          </FormItem>

          <FormItem>
            <Button
              block
              type="primary"
              loading={loading.effects['login/login']}
              onClick={this.submitForm}
              children={formatMessage({ id: 'LOGIN' })}
            />
          </FormItem>
          <FormItem>
            <Row gutter={20}>
              <Col span={12}>
                <Link to="/forgot" children={formatMessage({ id: 'PASSWORD_FORGOT' })} />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Link to="/forgot" children={formatMessage({ id: 'REGISTER' })} />
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    );
  }

  // 用户登录
  submitForm = () => {
    const { form, dispatch, history } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'signin/login', payload: values })
          .then(() => {
            history.replace('/');
          })
          .catch(message.error);
      }
    });
  };
}

export default Signin;
