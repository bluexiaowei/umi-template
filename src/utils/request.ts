/** global: URL */
import axios from 'axios';

const request = axios.create();

request.interceptors.response.use(
  function(response) {
    const { data } = response;
    if (data.success) {
      return data;
    } else {
      return Promise.reject(data);
    }
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
