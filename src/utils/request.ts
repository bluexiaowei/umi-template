/** global: URL */
import axios from 'axios';

const request = axios.create();

request.interceptors.response.use(
  function(response) {
    return response.data || { success: false, message: '未知错误' };
  },
  function(error) {
    let message = '未知错误';
    if (error.response.status === 0) {
      message = '网络错误';
    } else if (error.response && error.response.status > 499) {
      message = error.response.message || '服务器错误';
    }
    return { success: false, message };
  }
);

export default request;
