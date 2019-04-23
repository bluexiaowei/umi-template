import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { Menu } from 'antd';
import styles from './index.less';

interface ToolBarProps {
  selectKey?: string;
  onChange?: (select: string, data: Array<any>) => void;
  onClick?: (item: any) => void;
  menus: Array<any>;
}

interface ToolBarState {
  menuList: Array<any>;
}

export default class ToolBar extends React.Component<ToolBarProps> {
  constructor(props) {
    super(props);
  }

  ITEM_WIDTH = 100;
  state: ToolBarState = { menuList: [] };
  toolContent: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    this.stretchMenu();
  }

  render() {
    const { menuList } = this.state;
    return <div ref={this.toolContent}>{this.renderMenu(menuList)}</div>;
  }

  renderMenu = (menuList: any[]) => {
    const { selectKey } = this.props;
    return (
      <Menu
        mode="horizontal"
        className={styles.menu}
        selectedKeys={[selectKey]}
        onClick={this.onMenuClick}
      >
        {this.renderMenuItem(menuList)}
      </Menu>
    );
  };

  renderMenuItem = (menus: any[]): any[] => {
    return menus.map(item =>
      item.children ? (
        <Menu.SubMenu key={item.key} title="更多...">
          {this.renderMenuItem(item.children)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item.key} data-ref={item}>
          {formatMessage({ id: item.key })}
        </Menu.Item>
      )
    );
  };

  onMenuClick = ({ item, key, keyPath }) => {
    this.props.onClick(item.props['data-ref']);
  };

  stretchMenu = () => {
    const current = this.toolContent.current;
    const width = current.clientWidth;
    const menus = this.props.menus;

    this.setState({ menuList: menus });
  };
}
