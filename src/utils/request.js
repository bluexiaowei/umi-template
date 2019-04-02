/** global: URL */
import axios from 'axios';

function request(options) {
  if (window.URL) {
    options.baseURL = window.URL;
  }
  return axios(options)
    .then(function(response) {
      const res = { success: true, data: {}, message: '' };
      return { ...res, ...response.data };
    })
    .catch(function({ config, request = {}, response = {} }) {
      const { status } = request;
      const res = { success: false, data: {}, message: '未知错误' };
      if (status === 0) {
        return { ...res, message: '网络错误' };
      } else if (499 < status && status < 600) {
        return { ...res, ...response.data };
      }
      return res;
    });
}

export default request;
