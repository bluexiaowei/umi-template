import React from 'react';
import { Menu, Dropdown } from 'antd';

interface Props {
  data?: Array<{
    key: string;
    children: any;
  }>;
  children: any;
}

class Index extends React.Component<Props> {
  static defaultProps = {
    data: [],
  };

  render() {
    const { data, children, ...other } = this.props;

    return data.length ? (
      <Dropdown placement="bottomLeft" overlay={<Menu>{this.renderMenus(data)}</Menu>}>
        <div>{children}</div>
      </Dropdown>
    ) : (
      children
    );
  }

  renderMenus = data => {
    return data.map(item => <Menu.Item key={item.key}>{item.children}</Menu.Item>);
  };
}

export default Index;
