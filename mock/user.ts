import { mock } from 'mockjs';
import { delay } from 'roadhog-api-doc';

const API = {
  'POST /api/user/login': (req: Request, res: any) => {
    const response = mock({
      success: true,
      data: {
        id: 1,
        name: '@cname',
        username: '@maile',
        token: '',
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
  },
};
export default delay(API, 3000);
