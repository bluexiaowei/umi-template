import codeMsgJSON from '@/json/codeMsg.json';
import storage from '@/utils/storage';
import axios from 'axios';
import get from 'lodash/get';
import qs from 'qs';
import { toCamel } from '@/utils/namingStyle';

const tempWindow: any = window;
const newAxios = axios.create({
  baseURL: tempWindow.URL,
  transformResponse: [(data: string) => JSON.parse(toCamel(data))],
});

newAxios.interceptors.request.use(
  function success(config) {
    config.paramsSerializer = function(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    };

    config.headers['x-user-token'] = storage.cookie.get('token');

    return config;
  },
  function error(err) {
    return { success: false, message: err };
  },
);

newAxios.interceptors.response.use(
  function success(response) {
    return get(response, 'data', { success: true, data: {} });
  },
  function error(error) {
    if ('response' in error) {
      let isFind = false;
      const data = get(error, 'response.data', {
        success: false,
        message: '未知错误',
        code: undefined,
      });

      if (data.code) {
        for (let i = 0, len = codeMsgJSON.length; i < len; i++) {
          if (codeMsgJSON[i].key === data.code) {
            data.message = codeMsgJSON[i].label;
            isFind = true;
            break;
          }
        }
      }

      if (!isFind) {
        data.message = JSON.stringify(get(error, 'response.data.message')) || '未知错误';
      }

      // 有返回值
      return data;
    } else {
      return { success: false, message: '网络错误' };
    }
  },
);

export default newAxios;
