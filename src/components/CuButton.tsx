import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

interface Props extends ButtonProps {
  type: 'warning' | 'info';
}

export default function (props: Props) {
  return <Button {...props} />;
}
