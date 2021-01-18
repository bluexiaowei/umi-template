import { Row, Col, Dropdown, Menu, Avatar, Space } from 'antd';
import { useMemo } from 'react';
import { useModel } from 'umi';

export default () => {
  const { initialState } = useModel('@@initialState');
  const { setTrue, logout } = useModel('modal_password');
  const name = useMemo(() => {
    const name: string = initialState?.name || '';
    return name[0];
  }, [initialState?.name]);

  return (
    <Row gutter={20}>
      <Col>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={setTrue}>修改密码</Menu.Item>
              <Menu.Item onClick={logout}>用户退出</Menu.Item>
            </Menu>
          }
        >
          <Space>
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {name}
            </Avatar>

            {initialState?.name}
          </Space>
        </Dropdown>
      </Col>
    </Row>
  );
};
