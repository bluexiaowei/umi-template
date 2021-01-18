import cookie from '@/utils/cookie';
import storge from '@/utils/storge';
import { useBoolean } from 'ahooks';
import { history } from 'umi';

export default () => {
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  return {
    visible,
    setTrue,
    setFalse,
    logout: () => {
      setFalse();

      history.replace({
        pathname: '/login',
        query: {
          redirect: history.location.pathname,
        },
      });

      cookie.remove('token');
      storge.remove('user');
    },
  };
};
