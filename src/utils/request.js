/** global: URL */
import axios from 'axios';

function request(options) {
  options.baseURL = '/api';
  return axios(options)
    .then(function(response) {
      return response.data;
    })
    .catch(function({ config, request, response }) {
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
