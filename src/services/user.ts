import { request } from 'umi';

export function login(params: API.LoginReq) {
  return request<API.LoginRes>('/user/lgoin', { params });
}
