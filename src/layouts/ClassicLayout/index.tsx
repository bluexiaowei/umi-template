import React from 'react';
import { Layout, Menu, Icon, Row, Col, Avatar } from 'antd';

import Dropdown from './components/Dropdown';
import styles from './index.less';
class Index extends React.Component {
  render() {
    const { children } = this.props;

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
                <Dropdown data={[{ key: 'details', children: '个人中心' }]}>
                  <Avatar icon="user" size="small" /> admin
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
}

export default Index;
