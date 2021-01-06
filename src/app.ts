import RightContent from '@/components/RightContent';
import autoDownloadFile from '@/utils/autoDownloadFile';
import config from '@/utils/config';
import set from 'lodash/set';
import { RequestConfig } from 'umi';
import cookie from './utils/cookie';
import storge from './utils/storge';

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
  responseInterceptors: [autoDownloadFile],
};
