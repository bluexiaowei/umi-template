import { useBoolean } from 'ahooks';
import { Button, Statistic } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { useState } from 'react';
import { request, useRequest } from 'umi';

interface Props extends ButtonProps {
  data: any;
}

export default function (props: Props) {
  const { data, ...other } = props;
  const [show, { setTrue, setFalse }] = useBoolean(false);
  const [deadline, setDeadline] = useState(Date.now());

  const { loading, run } = useRequest(
    () => request('/send/code', { method: 'post', data }),
    {
      manual: true,
      onSuccess() {
        setDeadline(Date.now() + 1000 * 60);
        setTrue();
      },
    },
  );

  return show ? (
    <Button {...other} disabled>
      <Statistic.Countdown
        style={{ display: 'inline-block' }}
        value={deadline}
        format="ss"
        suffix="秒"
        onFinish={setFalse}
        valueStyle={{ fontSize: 16, color: '#d9d9d9' }}
      />
    </Button>
  ) : (
    <Button loading={loading} onClick={run} {...other}>
      {props.children}
    </Button>
  );
}
