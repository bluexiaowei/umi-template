import cookies from 'js-cookie';
import { Redirect, history } from 'umi';

export default (props: any) => {
  const token = cookies.get('token');

  if (Boolean(token)) {
    return props.children;
  } else if (history.location.pathname !== '/signin') {
    return <Redirect to="/signin" />;
  }
};
