/** global: URL */
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
const URL = '/';

function request(options: AxiosRequestConfig): AxiosPromise {
  options.baseURL = URL;
  return axios(options)
    .then(({ data = { success: false } }) => data)
    .catch(e => {
      const response = e.response || {};
      return { ...response.data, success: false };
    });
}

export default request;
