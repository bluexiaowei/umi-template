import format from '@/utils/format';
import request from '@/utils/request';

function getUser(url: string, sendData: any) {
  return new Promise((resolve, reject) => {
    request({ method: 'post', url, data: sendData })
      .then((res: any) => {
        res.data = format(res.data, [
          { name: 'id', type: 'string', defVal: '' },
          { name: 'username', defVal: '' },
          { name: 'name', defVal: '' },
          { name: 'token', defVal: '' },
          { name: 'exp', defVal: '' },
          { name: 'is_admin', defVal: false },
          {
            name: 'applications',
            defVal: [],
            children: [{ name: 'name' }, { name: 'roles', defVal: [] }],
          },
        ]);

        resolve(res);
      })
      .catch(reject);
  });
}

export function signin(params: any) {
  const sendData = format(params, [{ name: 'account', rename: 'username' }, { name: 'password' }]);

  return getUser('/user/login', sendData);
}

export function getUserInfo(params: any) {
  const sendData = format(params, [{ name: 'token' }]);

  return new Promise((resolve, reject) => {
    request({ method: 'post', url: '/user/token', data: sendData })
      .then((res: any) => {
        res.data = format(res.data, [
          { name: 'id', type: 'string', defVal: '' },
          { name: 'username', defVal: '' },
          { name: 'name', defVal: '' },
          { name: 'token', defVal: '' },
          { name: 'exp', defVal: '' },
          { name: 'is_admin', defVal: false },
          {
            name: 'applications',
            defVal: [],
            children: [{ name: 'name' }, { name: 'roles', defVal: [] }],
          },
        ]);

        resolve(res);
      })
      .catch(reject);
  });
}
