import cookie from '@/utils/cookie';
import { useBoolean } from 'ahooks';
import { history } from 'umi';

export default () => {
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  return {
    visible,
    setTrue,
    setFalse,
    logout: () => {
      history.replace({
        pathname: '/login',
        query: {
          form: history.location.pathname,
        },
      });

      cookie.remove('token');
    },
  };
};
