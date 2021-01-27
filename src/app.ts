import RightContent from '@/components/RightContent';
import autoDownloadFile from '@/utils/autoDownloadFile';
import config from '@/utils/config';
import set from 'lodash/set';
import { RequestConfig, useAccess } from 'umi';
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
  postMenuData(menuData: any) {
    const access: any = useAccess();

    return menuData.filter((item: any) => {
      if (item.access) {
        return Boolean(access[item.access]);
      }
      return true;
    });
  },
};

export const request: RequestConfig = {
  prefix: config.apiPrefix,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        data: resData.data,
        errorMessage: resData.message || '系统错误',
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
    async function redirectAssets(ctx, next) {
      // 将 @@ 作为定位符重定向到资源文件

      ctx.req.url = ctx.req.url.split('@@')[1];

      await next();
    },
  ],
  // responseInterceptors: [autoDownloadFile],
};
