import { history } from 'umi';

export default function (response: Response) {
  const _response = response.clone();

  if (_response.headers.get('Content-Type')?.includes('application/json')) {
    _response
      .json()
      .then((data) => {
        const authCodes = ['MW_01401', 'MW_01402', 'MW_01405'];

        if (authCodes.some((item) => item === data.code)) {
          history.push({
            ...history.location,
            pathname: '/login',
            query: {
              ...history.location.query,
              redirect: history.location.pathname,
            },
          });
        }
      })
      .catch((err) => console.log(err));
  }

  return response;
}
