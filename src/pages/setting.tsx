import cookie from '@/utils/cookie';
import { Link } from 'umi';

const Auth: React.FC = (props) => {
  const token = cookie.get('token');

  if (token) {
    return <>{props.children}</>;
  }

  return (
    <div style={{ padding: 250, textAlign: 'center' }}>
      <h1 style={{ color: 'red' }}>您还未登录!</h1>

      <Link to="/login">请先登录</Link>
    </div>
  );
};

export default Auth;
