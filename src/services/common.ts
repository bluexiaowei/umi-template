import { request } from 'umi';

export function sendPIN(params: { email: string }) {
  return request('/send/code', { method: 'post', data: params });
}

export function getOptions(name: string) {
  return request(`/@@/json/${name}.json`);
}
