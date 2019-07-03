import _ from 'lodash';
import qs from 'qs';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import storage from '@/Utils/storage';
import { baseURL } from './config';

const newAxios = axios.create({ baseURL });

newAxios.interceptors.request.use(
  function(config) {
    config.paramsSerializer = function(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

newAxios.interceptors.response.use(
  function(response) {
    return response.data || { success: false, message: '未知错误' };
  },
  function(event) {
    let result = {
      success: false,
      message: '未知错误',
    };

    const { config, request, response } = event;

    if (!request) {
    } else if (request.status === 0) {
      result.message = '网络错误';
    } else if (response.status > 400) {
      if (response.data.message.error) {
        result.message = response.data.message.error;
      } else {
        result.message = response.data.message;
      }
    } else if (response) {
      result = { ...result, ...response.data };
      result.message = result.message || '服务器错误';
    }

    return result;
  }
);

function request(params: AxiosRequestConfig): AxiosPromise {
  if (params) {
    params.headers = { 'x-user-token': storage.cookie.get('token') };
  }

  return newAxios(params);
}

export default {
  get(url: string, data: any, postions?: AxiosRequestConfig): AxiosPromise {
    return request({
      ...postions,
      url,
      params: data,
      method: 'get',
    });
  },
  put(url: string, data: any, postions?: AxiosRequestConfig): AxiosPromise {
    return request({
      ...postions,
      url,
      data,
      method: 'put',
    });
  },
  post(url: string, data: any, postions?: AxiosRequestConfig): AxiosPromise {
    return request({
      ...postions,
      url,
      data,
      method: 'post',
    });
  },
  delete(url: string, data: any, postions?: AxiosRequestConfig): AxiosPromise {
    return request({
      ...postions,
      url,
      data,
      method: 'delete',
    });
  },
  request,
};
