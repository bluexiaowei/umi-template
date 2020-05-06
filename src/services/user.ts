import { request } from 'umi';
import format from '@/utils/format';

export function signin(params: any) {
  const sendData = format(params, [
    { name: 'account', rename: 'username' },
    { name: 'password' },
  ]);

  return request('/user/login', { method: 'post', data: sendData }).then(res =>
    format(res.data, [
      { name: 'id' },
      { name: 'username', rename: 'name' },
      { name: 'token' },
    ]),
  );
}
