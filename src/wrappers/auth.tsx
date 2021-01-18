import { Redirect, history, useModel } from 'umi';
import qs from 'qs';

export default function (props: any) {
  const { initialState } = useModel('@@initialState');

  if (Boolean(initialState?.token)) {
    return props.children;
  } else if (history.location.pathname !== '/login') {
    return (
      <Redirect
        to={{
          pathname: '/login',
          search: qs.stringify({ redirect: history.location.pathname }),
        }}
      />
    );
  }
}
