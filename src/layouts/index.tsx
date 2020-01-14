import { ConnectProps } from '@/common/type';
import * as UserTS from '@/models/user.d';
import context from '@/utils/context';
import isIgnorePath from '@/utils/isIgnorePath';
import storage from '@/utils/storage';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { connect } from 'dva';
import { History, Location } from 'history';
import _ from 'lodash';
import React, { useLayoutEffect } from 'react';
import BlankLayout from './BlankLayout';
import ClassicLayout from './ClassicLayout';

interface Props extends UserTS.ModelState, ConnectProps {
  history: History;
  location: Location;
  children: JSX.Element;
}
interface RenderPageParams {
  blankPath: string[];
  pathname: string;
  children: any;
  other: any;
}

const layout = (props: Props): any => {
  const { children, location, user, dispatch, ...other } = props;
  const { pathname } = location;

  // 获取用户信息
  useLayoutEffect(() => {
    if (isIgnore(pathname)) return;

    const token = storage.cookie.get('token');

    if (_.isEmpty(token)) return;

    if (_.isEmpty(user)) {
      dispatch({ type: 'user/getUserInfo', payload: { token } }).catch(message.error);
    }
  }, [_.isEmpty(user)]);

  if (isIgnore(pathname) || (user && isAllow(user.applications, context.AUTH_NAME))) {
    return (
      <ConfigProvider locale={zhCN}>
        {renderPage({
          blankPath: ['/blank', 'signin'],
          pathname,
          children,
          other: { ...other, user },
        })}
      </ConfigProvider>
    );
  }

  return null;
};

export default connect(({ user }: any) => user)(layout);

function renderPage({ blankPath, pathname, children, other }: RenderPageParams) {
  const isIncludes = blankPath.some(item => pathname.includes(item));

  return isIncludes ? (
    <BlankLayout children={children} />
  ) : (
    <ClassicLayout children={children} {...other} />
  );
}

// 判断是否有登录权限
function isAllow(applications: UserTS.Application[], applicationName: string): boolean {
  return applications.some(item => item.name === applicationName);
}

function isIgnore(pathname: string) {
  return isIgnorePath() || isIgnorePath(pathname);
}
