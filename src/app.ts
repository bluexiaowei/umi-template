import RightContent from '@/components/RightContent';
// import autoDownloadFile from '@/utils/autoDownloadFile';
import config from '@/utils/config';
import { message } from 'antd';
import get from 'lodash/get';
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
    adaptor: (data) => {
      if (data.message) {
        message.destroy();

        return { ...data, errorMessage: data.message };
      }

      return { ...data, showType: 0 };
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
      const url: string = ctx.req.url;

      if (url.includes('@@')) {
        ctx.req.url = url.split('@@')[1];
      }

      await next();
    },
  ],
  responseInterceptors: [
    // autoDownloadFile,
    function (response) {
      const codeMaps = {
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
      };

      if (response.status in codeMaps) {
        message.destroy();

        message.error(get(codeMaps, response.status, ''));
      }

      return response;
    },
  ],
};
