import format from '@/utils/format';
import request from '@/utils/request';

export function signin(params: any) {
  const sendData = format(params, [{ name: 'account', rename: 'username' }, { name: 'password' }]);

  return new Promise((resolve, reject) => {
    request({ method: 'post', url: '/user/login', data: sendData })
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
