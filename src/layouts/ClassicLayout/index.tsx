import React from 'react';
import { Layout, Menu, Icon, Row, Col, Avatar } from 'antd';
import { connect } from 'dva';
import Dropdown from './components/Dropdown';
import * as TS from './index.d';
const styles = require('./index.less');
class Index extends React.Component<TS.Props> {
  render() {
    const { children, user = { username: '' } } = this.props;

    return (
      <Layout className={styles.container}>
        <Layout.Sider className={styles.sider}>
          <h1 className={styles.title}> Title </h1>

          <Menu theme="dark">
            <Menu.Item>
              <Icon type="highlight" /> 画布工具
            </Menu.Item>
          </Menu>
        </Layout.Sider>

        <Layout>
          <Layout.Header className={styles.header}>
            <Row type="flex" gutter={20}>
              <Col style={{ flex: 'auto' }} />

              <Col className={styles.headerHover}>
                <Dropdown
                  onClick={this.onDropdownClick}
                  data={[
                    { key: 'details', children: '个人中心' },
                    { key: 'logout', children: '用户退出' },
                  ]}
                >
                  <Avatar icon="user" size="small" /> {user.username}
                </Dropdown>
              </Col>

              <Col className={styles.headerHover}>
                <Dropdown data={[{ key: 'chinese', children: '简体中文' }]}>
                  <Icon type="global" />
                </Dropdown>
              </Col>
            </Row>
          </Layout.Header>

          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    );
  }

  onDropdownClick = ({ key }: any) => {
    if (key === 'logout') {
      this.props.dispatch({ type: 'user/logout' });
    }
  };
}

const ClassicLayout: any = connect(({ user }: any) => user)(Index);

export default ClassicLayout;
