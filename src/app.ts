// import './global.less';
import { RequestConfig, history } from 'umi';
import Cookies from 'js-cookie';
import isString from 'lodash/isString';
import get from 'lodash/get';
import set from 'lodash/set';

export async function getInitialState() {
  const token = Cookies.get('token');

  if (token) {
    return {
      ...JSON.parse(Cookies.get('user') || '{}'),
      // avatar: require('@/assets/icon/user.png'),
    };
  } else {
    history.push({
      pathname: '/signin',
      query: {},
    });
  }

  return {};
}

export const layout = {
  logout: () => {
    Cookies.remove('token');
    history.push('/signin');
  },
  // logo: require('@/assets/icon/ai.png'),
};

export const request: RequestConfig = {
  prefix: API_PREFIX,
  errorConfig: {
    adaptor: resData => {
      const message = isString(resData.message)
        ? resData.message
        : JSON.stringify(resData.message);

      if (get(resData, 'code', '') === 'DANUBE_SYS_01402') {
        history.push('/signin');
      }

      return {
        ...resData,
        errorMessage: message,
      };
    },
  },
  middlewares: [
    async function middlewareA(ctx, next) {
      // 添加鉴权信息
      set(ctx, 'req.options.headers["x-user-token"]', Cookies.get('token'));

      await next();
    },
  ],
};
