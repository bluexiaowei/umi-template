import React from 'react';
import { Layout, Menu, Icon, Row, Col, Avatar } from 'antd';
import Dropdown from './components/Dropdown';
import * as TS from './index.d';
import { ClickParam } from 'antd/lib/menu';
const styles = require('./index.less');

const menus: TS.Menu[] = [
  {
    title: 'test',
    path: '/test',
  },
];
const ClassicLayout = (props: TS.Props) => {
  const { children, dispatch, user = {} } = props;

  return (
    <Layout className={styles.container}>
      <Layout.Sider className={styles.sider}>
        <h1 className={styles.title}> Title </h1>

        <Menu theme="dark">{renderMenusItem(menus)}</Menu>
      </Layout.Sider>

      <Layout>
        <Layout.Header className={styles.header}>
          <Row type="flex" gutter={20}>
            <Col style={{ flex: 'auto' }} />

            <Col className={styles.headerHover}>
              <Dropdown data={[{ key: 'chinese', children: '简体中文' }]}>
                <Icon type="global" />
              </Dropdown>
            </Col>

            <Col className={styles.headerHover}>
              <Dropdown
                onClick={onDropdownClick}
                data={[
                  { key: 'details', children: '个人中心' },
                  { key: 'logout', children: '用户退出' },
                ]}
              >
                <Avatar icon="user" size="small" /> {user.name}
              </Dropdown>
            </Col>
          </Row>
        </Layout.Header>

        <Layout.Content>
          <div style={{ position: 'absolute', width: '100%', height: '100%' }}>{children}</div>
        </Layout.Content>
      </Layout>
    </Layout>
  );

  function onDropdownClick({ key }: ClickParam) {
    switch (key) {
      case 'logout':
        dispatch({ type: 'user/logout' });
        break;

      default:
        break;
    }
  }
};

function renderMenusItem(menus: TS.Menu[]) {
  return menus.map(menu =>
    Array.isArray(menu.children) ? (
      <Menu.SubMenu disabled={menu.disabled} title={title(menu)} key={menu.path}>
        {renderMenusItem(menu.children)}
      </Menu.SubMenu>
    ) : (
      <Menu.Item disabled={menu.disabled} title={menu.title} key={menu.path}>
        {title(menu)}
      </Menu.Item>
    ),
  );

  /**
   * 渲染菜单标题
   * @param menu [object] 菜单参数
   */
  function title(menu: TS.Menu) {
    return (
      <>
        <Icon type={menu.icon} />
        <span>{menu.title}</span>
      </>
    );
  }
}

export default ClassicLayout;
