import * as UserTS from '@/models/user.d';
import context from '@/utils/context';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { connect } from 'dva';
import { History, Location } from 'history';
import React, { useLayoutEffect } from 'react';
import BlankLayout from './BlankLayout';
import ClassicLayout from './ClassicLayout';
import isEmpty from 'lodash/isEmpty';
import { ConnectProps } from '@/common/type';
import storage from '@/utils/storage';
import user from 'mock/user';

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

  useLayoutEffect(() => {
    if (!isEmpty(user)) return;

    const token = storage.cookie.get('token');

    if (token && isEmpty(user) && context.IGNORE_PATH[0] !== '*') {
      dispatch({ type: 'user/getUserInfo', payload: { token } }).catch(message.error);
    }
  }, [user]);

  if (isIgnorePath(pathname) || (user && isAllow(user.applications, context.AUTH_NAME))) {
    return (
      <ConfigProvider locale={zhCN}>
        {renderPage({ blankPath: ['/blank', 'signin'], pathname, children, other })}
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

function isIgnorePath(pathname: string) {
  if (context.IGNORE_PATH[0] === '*') return true;

  return context.IGNORE_PATH.some(item => pathname.includes(item));
}

// 判断是否有登录权限
function isAllow(applications: UserTS.Application[], applicationName: string): boolean {
  for (let i = 0, len = applications.length; i < len; i++) {
    if (applications[i].name === applicationName) {
      return true;
    }
  }

  return false;
}
