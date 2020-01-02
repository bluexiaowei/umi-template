import React from 'react';
import BlankLayout from './BlankLayout';
import ClassicLayout from './ClassicLayout';
import { History, Location } from 'history';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

interface Props {
  history: History;
  location: Location;
  children: JSX.Element;
}

export default (props: Props): JSX.Element => {
  const { children, location, ...other } = props;
  const { pathname } = location;
  const BlankLayouts = ['/blank', 'signin'];
  let layout;
  if (BlankLayouts.some(item => pathname.includes(item))) {
    layout = <BlankLayout children={children} />;
  } else {
    layout = <ClassicLayout children={children} {...other} />;
  }

  return <ConfigProvider locale={zhCN}>{layout}</ConfigProvider>;
};
