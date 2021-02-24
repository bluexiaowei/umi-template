import qs from 'qs';
import { Redirect, useLocation, useModel } from 'umi';

export default function (props: any) {
  const { initialState } = useModel('@@initialState');
  const location = useLocation();

  if (Boolean(initialState?.token)) {
    return props.children;
  } else if (location.pathname !== '/login') {
    return (
      <Redirect
        to={{
          pathname: '/login',
          search: qs.stringify({ redirect: location.pathname }),
        }}
      />
    );
  }
}
