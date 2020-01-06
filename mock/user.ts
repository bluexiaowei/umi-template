import { mock } from 'mockjs';
import { delay } from 'roadhog-api-doc';

function createUserInfo(req: Request, res: any) {
  const response = mock({
    success: true,
    data: {
      id: 1,
      name: '@cname',
      username: '@maile',
      token: '123456',
      exp: '2018-12-12 00:00:00',
      is_admin: true,
      applications: [
        {
          id: 1,
          name: 'umi_template',
          roles: [
            {
              id: 1,
              name: '',
              is_inherent: 0,
            },
          ],
        },
      ],
    },
    message: '',
  });

  res.json(response);
}

const API = {
  'POST /api/user/login': createUserInfo,
  'POST /api/user/token': createUserInfo,
};
export default delay(API, 3000);
