/** global: URL */
import axios from 'axios';
import storage from '@/Utils/storage';
import { baseURL } from './config';

const request = axios.create({ baseURL, headers: { 'x-user-token': storage.cookie.get('token') } });

request.interceptors.response.use(
  function(response) {
    return response.data || { success: false, message: '未知错误' };
  },
  function({ response }) {
    let result = { success: false, message: '未知错误' };
    if (!response) {
      return result;
    }
    if (response.status === 0) {
      result.message = '网络错误';
    } else if (response) {
      result = { ...result, ...response.data };
      result.message = result.message || '服务器错误';
    }

    return result;
  }
);

export default request;
