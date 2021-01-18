import { request } from 'umi';

export function login(params: API.LoginReq) {
  return request<API.LoginRes>('/user/login', { method: 'post', data: params });
}
export function putPwd(params: any) {
  return request('/user/password/update', { method: 'put', data: params });
}
