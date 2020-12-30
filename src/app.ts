import RightContent from '@/components/RightContent';
import { RequestConfig } from 'umi';
import config from '@/utils/config';
import cookie from './utils/cookie';
import storge from './utils/storge';
import set from 'lodash/set';

export async function getInitialState() {
  if (cookie.get('token')) {
    return storge.get('user');
  } else {
    return undefined;
  }
}

export const layout = {
  rightRender: RightContent,
};

export const request: RequestConfig = {
  prefix: config.apiPrefix,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        data: resData.data,
        errorMessage: resData.message,
      };
    },
  },
  middlewares: [
    async function addAuth(ctx, next) {
      const user = storge.get('user');
      // 添加鉴权信息
      set(ctx, 'req.options.headers["x-user-token"]', user?.token);

      await next();
    },
  ],
};
