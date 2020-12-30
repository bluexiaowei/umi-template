import { Row, Col, Dropdown, Menu, Avatar } from 'antd';
import { useModel } from 'umi';

export default () => {
  const { setTrue, logout } = useModel('modal_password');
  const { initialState } = useModel('@@initialState');

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
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            {initialState?.user_name}
          </Avatar>
        </Dropdown>
      </Col>
    </Row>
  );
};
